import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFilteredProducts } from '../aksiyonlar/actions'; // Set filtered products action
import '../styles/categoryList.css'; // CSS dosyasını import et

class CategoryList extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/categories')
      .then((response) => {
        this.setState({ categories: response.data });
      })
      .catch((error) => {
        console.error("Kategoriler alınırken hata oluştu:", error);
      });
  }

  handleCategoryClick = (category) => {
    // Kategoriyi filtrele ve ürünleri ayarla
    const filteredProducts = this.props.products.filter(product => product.categoryId === category._id);
    this.props.setFilteredProducts(filteredProducts);
  };

  render() {
    return (
      <div className="category-list-container">
        <h2 className="category-list-title">Kategoriler</h2>
        <ul className="category-list">
          {this.state.categories.map(category => (
            <li key={category._id} className="category-item" onClick={() => this.handleCategoryClick(category)}>
              {category.name}
            </li>
          ))}
          <li className="category-item" onClick={() => this.props.setFilteredProducts(this.props.products)}>
            Ürünlerin Tümünü Göster
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.filteredProducts || [], // Tüm ürünleri al
});

const mapDispatchToProps = {
  setFilteredProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
