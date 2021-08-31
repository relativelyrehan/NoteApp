import {ActionTypes} from '../constants';

export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_NOTES:
      return [...action.payload];
    default:
      return state;
  }
};
