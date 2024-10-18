import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams import edildi

const ProductDetail = () => {
  const { id } = useParams(); // URL'den ürün ID'sini al
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  const fetchProductDetail = (id) => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ürün detayları alınırken hata oluştu:", error);
        setLoading(false);
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
      {/* Daha fazla ürün detayı eklenebilir */}
    </div>
  );
};

export default ProductDetail;
