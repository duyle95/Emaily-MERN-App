import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import Sort from './Sort';

const Dashboard = () => {
  return (
    <div>
      <Sort />
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red pulse">
          <i className="large material-icons">android</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
