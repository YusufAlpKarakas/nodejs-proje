// cartReducer.js

import initialState from './initialState';

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      case 'UPDATE_CART_QUANTITY':
        return {
          ...state,
          cart: state.cart.map(item => 
            item._id === action.payload.productId 
            ? { ...item, quantity: action.payload.quantity } 
            : item
          ),
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter(item => item._id !== action.payload),
        };
      default:
        return state;
    }
  };

export default cartReducer;
