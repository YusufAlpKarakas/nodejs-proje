import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES } from '../aksiyonlar/actions';
import initialState from './initialState';


const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, favoriteProducts: action.payload };
    case ADD_FAVORITE:
      // Önce ürünün zaten favorilerde olup olmadığını kontrol edin
      const exists = state.favoriteProducts.find(
        (product) => product._id === action.payload._id
      );
      if (exists) {
        return state; // Ürün zaten favorilerdeyse değişiklik yapma
      }
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favoriteProducts: state.favoriteProducts.filter(
          (product) => product._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
