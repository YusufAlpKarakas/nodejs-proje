import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/categoryPage.css' // CSS dosyasını ekleyin

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products?category=${id}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Ürünleri yüklerken hata:', error);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/categories/${id}`);
        if (response.data) {
          setCategoryName(response.data.name); // Kategori adını ayarla
        } else {
          console.error('Kategori bulunamadı');
        }
      } catch (error) {
        console.error('Kategori adını yüklerken hata:', error);
      }
    };

    fetchCategoryProducts();
    fetchCategoryName();
  }, [id]);

  return (
    <div className="category-container">
      <h1 className="category-title">{categoryName} Kategorisine Ait Ürünler</h1>
      <div className="products-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-card">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Fiyat: {product.price}₺</p>
            </div>
          ))
        ) : (
          <p>Bu kategori altında ürün bulunmamaktadır.</p>
        )}
      </div>
      <Link to="/" className="back-link">Ürünlerin Tümüne Dön</Link>
    </div>
  );
};

export default CategoryPage;
