import {ActionTypes} from '../constants';

export const setUser = name => {
  return {
    type: ActionTypes.SET_USER,
    payload: name,
  };
};
