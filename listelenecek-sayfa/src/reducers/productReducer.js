// productsReducer.js

import {
    SET_FILTERED_PRODUCTS,
    FILTER_PRODUCTS_BY_CATEGORY,
  } from '../aksiyonlar/actions'; // actions dosyasından eylem türlerini içe aktar
  
  import initialState from './initialState';

  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_FILTERED_PRODUCTS:
        return {
          ...state,
          filteredProducts: action.payload,
        };
  
      case FILTER_PRODUCTS_BY_CATEGORY: // Kategoriye göre filtreleme
        return {
          ...state,
          filteredProducts: state.products.filter(product => product.category === action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default productsReducer;
  