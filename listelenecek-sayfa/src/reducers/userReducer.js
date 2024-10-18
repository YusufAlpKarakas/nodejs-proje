import { SET_USER, CLEAR_USER } from '../aksiyonlar/actions';
import { SET_FILTERED_PRODUCTS } from '../aksiyonlar/actions';

import initialState from './initialState';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;
