import {ActionTypes} from '../constants';

const initialState = [{name: ''}];

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return [...state, {name: action.payload}];
    default:
      return state;
  }
};
