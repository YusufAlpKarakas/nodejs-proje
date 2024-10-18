import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CategoryInput from './CategoryInput';
import '../../styles/categoryList.css'; // CSS dosyasını ekleyin

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    axios.get('http://localhost:5000/categories')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Kategoriler alınırken hata oluştu:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="category-list">
      <h2>Kategoriler</h2>
      <CategoryInput fetchCategories={fetchCategories} /> {/* Kategori ekleme formunu ekle */}
      <ul>
        {categories.length > 0 ? (
          categories.map(category => (
            <li key={category._id}>
              <Link to={`/category/${category._id}/${category.name}`}>{category.name}</Link>
            </li>
          ))
        ) : (
          <p>Hiç kategori bulunamadı.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
