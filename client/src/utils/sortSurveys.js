export default (surveys, sortProperty, sortType) => {
  switch (sortProperty) {
    case 'yes':
      return sortNumber(surveys, 'yes', sortType);
    case 'no':
      return sortNumber(surveys, 'no', sortType);
    case 'dateSent':
      return sortDate(surveys, 'dateSent', sortType);
    case 'lastResponded':
      // split surveys into 2 arrays: one with exact date and one with 'no respond was sent'
      // sort the first array with the conditions and return the merge array
      let noResponds = surveys.filter(survey => !survey.lastResponded);
      let responds = surveys.filter(survey => survey.lastResponded);
      if (sortType === 'asc') {
        return noResponds.concat(sortDate(responds, 'lastResponded', 'asc'));
      } else {
        return sortDate(responds, 'lastResponded', 'dsc').concat(noResponds);
      }
    default:
      return surveys;
  }
}

const sortNumber = (surveys, sortProperty, sortType) => {
  if (sortType === 'asc') {
    return surveys.sort((a, b) => (a[sortProperty]) - (b[sortProperty]));
  } else {
    return surveys.sort((a, b) => (b[sortProperty]) - (a[sortProperty]));
  }
}

const sortDate = (surveys, sortProperty, sortType) => {
  if (sortType === 'asc') {
    return surveys.sort((a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty]));
  } else {
    return surveys.sort((a, b) => new Date(b[sortProperty]) - new Date(a[sortProperty]));
  }
}
