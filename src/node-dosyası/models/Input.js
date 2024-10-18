import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/input.css';

const Input = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Formun otomatik olarak yenilenmesini engelle

    const newProduct = { 
      name, 
      price: Number(price), 
      description 
      // Eğer kategori eklemek istiyorsan burada kategori ID'sini de eklemelisin
    };

    // Backend'e POST isteği gönder
    axios.post('http://localhost:5000/products', newProduct)
      .then((response) => {
        console.log("Ürün eklendi:", response.data);
        setName('');
        setPrice('');
        setDescription('');
        if (onProductAdded) {
          onProductAdded(); // Yeni ürün eklendiğinde listeyi güncelle
        }
      })
      .catch((error) => {
        console.error("Ürün eklenirken hata oluştu:", error);
      });
  };

  return (
    <div className="input-form-container">
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type='text'
          name='name'
          placeholder='Ürün adını girin'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          required
        />
        <input
          type='number'
          name='price'
          placeholder='Ürün fiyatını girin'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-input"
          required
        />
        <input
          type='text'
          name='description'
          placeholder='Ürün açıklamasını girin'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          required
        />
        <button type='submit' className="submit-button">Ürün Ekle</button>
      </form>
    </div>
  );
};

export default Input;
