import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setFavorites, removeFavorite } from '../aksiyonlar/actions';

const FavoriteProduct = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.favorites.favoriteProducts);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/favorites?userId=${user.id}`);
          dispatch(setFavorites(response.data));
        } catch (error) {
          console.error("Favori ürünler alınırken hata oluştu:", error);
        }
      }
    };

    fetchFavoriteProducts();
  }, [dispatch]);

  const handleRemoveFavorite = async (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      try {
        await axios.delete(`http://localhost:5000/favorites/${productId}?userId=${user.id}`);
        dispatch(removeFavorite(productId));
      } catch (error) {
        console.error("Favori ürün silinirken hata oluştu:", error);
      }
    }
  };

  return (
    <div>
      <h2>Favori Ürünler</h2>
      {favoriteProducts.length > 0 ? (
        <div className="favorite-products">
          {favoriteProducts.map((product) => (
            <div key={product._id} className="product-card">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price"><strong>Fiyat:</strong> {product.price} TL</p>
              <p className="product-description"><strong>Açıklama:</strong> {product.description}</p>
              <button onClick={() => handleRemoveFavorite(product._id)}>Favorilerden Kaldır</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-favorites">Henüz favori ürün eklenmemiş.</p>
      )}
    </div>
  );
};

export default FavoriteProduct;
