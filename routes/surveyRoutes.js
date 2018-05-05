const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const cleanCache = require('../middlewares/cleanCache');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.delete('/api/surveys/delete/:surveyId', requireLogin, async (req, res) => {
    const p = new Path('/api/surveys/delete/:surveyId'),
          fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const match = p.test(new URL(fullUrl).pathname);
    console.log(match.surveyId);
    await Survey.deleteOne({ _id: match.surveyId});

    res.send({});
  });

  // all processing logic with webhooks, filtering.
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        // return a object with properties: surveyId, choice
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each( ({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    console.log(events);

    res.send({});
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).cache({ key: req.user.id });

    res.send(surveys);
  });

  app.post('/api/surveys', requireLogin, requireCredits, cleanCache, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }

  });
};
