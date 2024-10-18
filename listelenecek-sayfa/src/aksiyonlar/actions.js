export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const SET_FAVORITES = 'SET_FAVORITES';
export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Kullanıcı için Eylem Türleri
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

// Favori Ürünler için Eylem Yaratıcıları
export const addFavorite = (product) => ({
  type: ADD_FAVORITE,
  payload: product,
});

export const removeFavorite = (productId) => ({
  type: REMOVE_FAVORITE,
  payload: productId,
});

export const setFavorites = (products) => ({
  type: SET_FAVORITES,
  payload: products,
});

// Kullanıcı için Eylem Yaratıcıları
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setFilteredProducts = (products) => ({
  type: SET_FILTERED_PRODUCTS,
  payload: products,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
