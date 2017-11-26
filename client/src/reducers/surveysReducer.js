import {
  FETCH_SURVEYS,
  DELETE_SURVEY,
  SORT_SURVEYS
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    case DELETE_SURVEY:
      return state.filter(survey => survey._id !== action.payload);
    default:
      return state;
  }
}
