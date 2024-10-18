// store.js
import { createStore, combineReducers } from 'redux';
import favoritesReducer from './favoritesReducer';
import userReducer from './userReducer';
import filteredReducer from './filteredReducer'; // Yeni eklenen filteredReducer
import cartReducer from './sepetReducer';

// Tüm reducer'ları birleştiriyoruz
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  user: userReducer,
  cart: cartReducer,
  products: filteredReducer, // filteredReducer'ı ekleyin
});

// Redux DevTools için enhancer ekliyoruz
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
