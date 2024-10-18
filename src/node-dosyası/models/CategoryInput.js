// CategoryInput.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/categoryInput.css'

const CategoryInput = ({ fetchCategories }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/categories', { name: categoryName })
      .then((response) => {
        console.log('Kategori eklendi:', response.data);
        fetchCategories(); // Kategori eklendikten sonra kategorileri yeniden yükle
        setCategoryName(''); // Input alanını temizle
      })
      .catch((error) => {
        console.error('Kategori eklenirken hata oluştu:', error);
      });
  };

  return (
<form onSubmit={handleSubmit} className="category-input-form">
  <input
    type="text"
    placeholder="Kategori adı ekleyin"
    value={categoryName}
    onChange={(e) => setCategoryName(e.target.value)}
    required
    className="category-input"
  />
  <button type="submit" className="category-button">Kategori Ekle</button>
</form>

  );
};

export default CategoryInput;
