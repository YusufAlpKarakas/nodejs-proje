// filteredReducer.js
import initialState from './initialState';

  const filteredReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FILTERED_PRODUCTS':
        return {
          ...state,
          filteredProducts: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default filteredReducer;
  