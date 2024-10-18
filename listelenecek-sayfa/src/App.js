import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Login from './sayfalar/Login';
import ProductList from './sayfalar/ProductList';
import Singin from './sayfalar/Singin';
import Navi from './sayfalar/Navi';
import FavoriteProduct from './sayfalar/FavoriteProduct';
import './App.css';
import ForgotPassword from './sayfalar/ForgotPassword';
import SepetDetayi from './sayfalar/SepetDetayi';
import ProductDetail from './sayfalar/ProductDetail';
import Home from './sayfalar/Home'; // Home bileşenini import edin
import CategoryPage from './sayfalar/CategoryPage'; // Kategori sayfasını import edin

function App() {
  return (
    <Container fluid>
      <Navi />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ana sayfa */}
        <Route path="/login" element={<Login />} />
        <Route path="/singin" element={<Singin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/favorites" element={<FavoriteProduct />} />
        <Route path="/sepetdetayi" element={<SepetDetayi />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:id" element={<CategoryPage />} /> {/* Kategori sayfası */}
      </Routes>
    </Container>
  );
}

export default App;
