import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/productDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // URL'den id'yi al
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ürün alınırken hata oluştu:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/products/${id}`, formData)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Ürün güncellenirken hata oluştu:", error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        alert('Ürün silindi');
      })
      .catch((error) => {
        console.error("Ürün silinirken hata oluştu:", error);
      });
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (!product) {
    return <p>Ürün bulunamadı.</p>;
  }

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>
      <p><strong>Fiyat:</strong> {product.price} TL</p>
      <p><strong>Açıklama:</strong> {product.description}</p>

      <form onSubmit={handleUpdate} className="update-form">
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          required
        />
        <button type='submit' className="update-button">Güncelle</button>
      </form>

      <button onClick={handleDelete} className="delete-button">Sil</button>
    </div>
  );
};

export default ProductDetail;
