import {ActionTypes} from '../constants';

export const setNotes = notes => {
  return {
    type: ActionTypes.SET_NOTES,
    payload: notes,
  };
};
