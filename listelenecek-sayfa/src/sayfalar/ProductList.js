import React, { Component } from 'react';
import axios from 'axios';
import '../styles/productList.css';
import { connect } from 'react-redux';
import { addFavorite, setFilteredProducts, addToCart } from '../aksiyonlar/actions';
import { withRouter } from '../withRouter';
import CategoryList from './CategoryList'; // Kategori listesi bileşenini import et

class ProductList extends Component {
  state = {
    products: [],
    sortOrder: 'asc', // Sıralama durumu (artan/azalan)
  };

  componentDidMount() {
    axios.get('http://localhost:5000/products')
      .then((response) => {
        this.setState({ products: response.data });
        this.props.setFilteredProducts(response.data); // Tüm ürünleri filtrelenmiş olarak ayarla
        this.sortProducts(this.state.sortOrder); // Başlangıçta sıralama
      })
      .catch((error) => {
        console.error("Ürünler alınırken hata oluştu:", error);
      });
  }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  handleAddFavorite = (product) => {
    const user = this.getUser();
    if (!user) {
      this.props.navigate('/signin'); // Düzeltme yapıldı
    } else {
      axios.post('http://localhost:5000/favorites', {
        userId: user.id,
        productId: product._id
      })
      .then((response) => {
        this.props.addFavorite(product);
        alert('Ürün favorilere eklendi.');
      })
      .catch((error) => {
        console.error("Favori eklenirken hata oluştu:", error);
        alert(error.response.data.message || 'Favori eklenemedi.');
      });
    }
  };

  handleAddToCart = (product) => {
    const user = this.getUser();
    if (!user) {
      this.props.navigate('/signin'); // Düzeltme yapıldı
    } else {
      this.props.addToCart(product); // Sepete ekle
      alert(`${product.name} sepete eklendi.`);
    }
  };

  handleSortChange = (e) => {
    const order = e.target.value;
    this.setState({ sortOrder: order }, () => {
      this.sortProducts(order);
    });
  };

  sortProducts = (order) => {
    const { products } = this.state;
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    this.props.setFilteredProducts(sortedProducts);
  };

  render() {
    return (
      <div className="product-list-container">
        <h2 className="product-list-title">Ürün Listesi</h2>

        <CategoryList /> {/* Kategori listesini ekle */}

        <form>
          <label htmlFor="sortOrder">Fiyat Sıralama:</label>
          <select id="sortOrder" value={this.state.sortOrder} onChange={this.handleSortChange}>
            <option value="asc">En Düşükten En Yükseğe</option>
            <option value="desc">En Yüksekten En Düşüğe</option>
          </select>
        </form>

        <div className="product-list">
          {this.props.filteredProducts.length > 0 ? (
            this.props.filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price"><strong>Fiyat:</strong> {product.price} TL</p>
                <p className="product-description"><strong>Açıklama:</strong> {product.description}</p>
                <button onClick={() => this.handleAddFavorite(product)}>Favorilere Ekle</button>
                <button onClick={() => this.handleAddToCart(product)}>Sepete Ekle</button>
              </div>
            ))
          ) : (
            <p className="no-products">Henüz ürün eklenmemiş.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredProducts: state.products.filteredProducts || [],
});

const mapDispatchToProps = {
  addFavorite,
  setFilteredProducts,
  addToCart, // addToCart eylemini ekle
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList));
