import {
  FETCH_SURVEYS,
  DELETE_SURVEY,
  SORT_SURVEYS
} from '../actions/types';
import sortSurveys from '../utils/sortSurveys';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    case DELETE_SURVEY:
      return state.filter(survey => survey._id !== action.payload);
    case SORT_SURVEYS:
      const { sortProperty, sortType } = action.payload;
      const surveys = JSON.parse(JSON.stringify(state));
      return sortSurveys(surveys, sortProperty, sortType);
    default:
      return state;
  }
}
