import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css' // CSS dosyasını ekleyin

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    };

    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Tüm Ürün ve Kategoriler</h1>
      <div className="category-buttons">
        {categories.map(category => (
          <Link key={category._id} to={`/category/${category._id}`}>
            <button className="category-button">{category.name}</button>
          </Link>
        ))}
      </div>
      <h2 className="products-title">Tüm Ürünler</h2>
      <div className="products-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Fiyat: {product.price}₺</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Home;
