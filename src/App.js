import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './node-dosyası/models/ProductList'; // Ürün listesi bileşeni
import ProductDetail from './node-dosyası/models/ProductDetail'; // Ürün detay bileşeni
import CategoryList from './node-dosyası/models/CategoryList'; // Kategori listesi bileşeni
import CategoryProducts from './node-dosyası/models/CategoryProducts'; // Kategoriye özel ürünler bileşeni
import Navi from './node-dosyası/models/Navi';

function App() {
  return (
    <Router>
      <div>
        <Navi/>
        <h1>Ürün Yönetim Paneli</h1>
        <CategoryList/>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<CategoryProducts />} /> {/* Kategoriye özel ürünler */}
          <Route path="/category/:id/:categoryName" element={<CategoryProducts />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
