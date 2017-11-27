import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  handleClick(surveyId) {
    this.props.deleteSurvey(surveyId);
  }

  renderSurveys() {
    return this.props.surveys.map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: { new Date(survey.dateSent).toLocaleDateString() }
            </p>
            <br/>
            <p className="right">
              Last Responded: { survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : 'No respond was sent' }
            </p>
          </div>
          <div className="card-action">
            <a href="#yes">Yes: {survey.yes}</a>
            <a href="#no">No: {survey.no}</a>
            <button className="waves-effect waves-light btn" onClick={() => this.handleClick(survey._id)}><i className="small material-icons">delete</i></button>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({surveys}) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);
