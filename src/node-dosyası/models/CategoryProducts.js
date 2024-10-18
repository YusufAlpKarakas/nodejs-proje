import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/categoryProducts.css';

const CategoryProducts = () => {
  const { id, categoryName } = useParams(); // Kategori ID'sini ve ismini al
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  useEffect(() => {
    fetchCategoryProducts(id);
  }, [id]);

  const fetchCategoryProducts = (categoryId) => {
    axios.get(`http://localhost:5000/products?category=${categoryId}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ürünler alınırken hata oluştu:", error);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { 
      name: productName, 
      price: productPrice, 
      description: productDescription, 
      category: id // Kategori ID'sini ekle
    };

    axios.post('http://localhost:5000/products', newProduct)
      .then((response) => {
        console.log('Ürün eklendi:', response.data);
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setProductName('');
        setProductPrice('');
        setProductDescription('');
      })
      .catch((error) => {
        console.error('Ürün eklenirken hata oluştu:', error);
        alert("Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="category-products">
      <h2>{categoryName} Kategorisi İçin Ürün Ekle</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Ürün adı"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="product-input"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
          className="product-input"
        />
        <textarea
          placeholder="Açıklama"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
          className="product-textarea"
        />
        <button type="submit" className="product-button">Ürün Ekle</button>
      </form>

      <h3>Ürünler</h3>
      <ul className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id} className="product-item">
              {product.name} - {product.price}₺
              <p className="product-description">{product.description}</p>
            </li>
          ))
        ) : (
          <p>Bu kategoriye ait ürün bulunamadı.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryProducts;
