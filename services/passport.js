const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// 1 param = fetch something out of mongoose(database)
// 2 params = load something to mongoose(database)
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// check with database to find a user that has the same id(not googleid). This id is extracted from the cookie in the request by cookie-session, which modifies the request and assigns this id to a 'session' property in the request.
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// start auth with Google, create an object with 3 params(clientID, clientSecret, callbackURL)
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    // this is a asynchronous function, which will return a promise
    User.findOne({ googleID: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile id
          // call function 'done' to finish with first param is an error and second param is the returned model instance, which in this case existingUser
          done(null, existingUser);
        } else {
          // we create a new user
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
  })
);
