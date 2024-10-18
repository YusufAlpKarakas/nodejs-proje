import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './Input'; // Ürün ekleme bileşeni
import { FaTrash } from 'react-icons/fa';
import '../../styles/productList.css';

export default class ProductList extends Component {
  state = {
    products: [] // Ürünlerin listeleneceği state
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios.get('http://localhost:5000/products') // Burada tüm ürünleri çekiyoruz.
      .then((response) => {
        // Kategoriye özgü ürünleri hariç tut
        const filteredProducts = response.data.filter(product => !product.category);
        this.setState({ products: filteredProducts });
      })
      .catch((error) => {
        console.error("Ürünler alınırken hata oluştu:", error);
      });
  };

  deleteProduct = (productId) => {
    axios.delete(`http://localhost:5000/products/${productId}`)
      .then(() => {
        this.fetchProducts();
      })
      .catch((error) => {
        console.error("Ürün silinirken hata oluştu:", error);
      });
  };

  render() {
    return (
      <div className="product-list-container">
        <h2>Ürün Listesi</h2>
        <div className="input-container">
          <Input onProductAdded={() => this.fetchProducts()} /> {/* Ürün ekleme bileşeni */}
        </div>
        <h3>Mevcut Ürünler</h3>
        <div className="product-grid">
          {this.state.products.length > 0 ? (
            this.state.products.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} className="product-link">
                  <h3>{product.name}</h3>
                  <p><strong>Fiyat:</strong> {product.price} TL</p>
                  <p><strong>Açıklama:</strong> {product.description}</p>
                </Link>
                <button
                  onClick={() => this.deleteProduct(product._id)}
                  className="delete-button"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))
          ) : (
            <p>Henüz ürün eklenmemiş.</p>
          )}
        </div>
      </div>
    );
  }
}
