import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser, setUser, setFilteredProducts } from '../aksiyonlar/actions';

const Navi = ({ user, clearUser, setUser, setFilteredProducts, products, cart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const timeoutId = setTimeout(() => {
      handleLogout();
    }, 1 * 60 * 60 * 1000); // 1 saat

    return () => clearTimeout(timeoutId);
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    clearUser();
    window.location.reload();
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtreleme işlemi
    if (term) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().startsWith(term.toLowerCase()) // a ile başlayan ürünleri filtrele
      );
      setFilteredProducts(filteredProducts);
    } else {
      // Arama kutusu boşsa tüm ürünleri göster
      setFilteredProducts(products); 
    }
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li><Link to="/" style={styles.link}>Ana Sayfa</Link></li>
        {!user && (
          <>
            <li><Link to="/singin" style={styles.link}>Sign Up</Link></li>
            <li><Link to="/login" style={styles.link}>Log In</Link></li>
          </>
        )}
        <li>
          <Link to="/favorites" style={styles.link}>Favori Ürünler</Link>
        </li>
        <li>
          <Link to="/sepetdetayi" style={styles.link}>
            Sepet {cart.length > 0 && <span style={styles.cartCount}>{cart.length}</span>} {/* Sepet sayısını göster */}
          </Link>
        </li>
      </ul>
      <input
        type="text"
        placeholder="Ürün Ara..."
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      {user && (
        <div style={styles.userSection}>
          <span style={styles.userName}>Hoşgeldin, {user.name}!</span>
          <button onClick={handleLogout} style={styles.logoutButton}>Çıkış Yap</button>
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    gap: '15px',
    color: '#fff',
    margin: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  searchInput: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
  },
  userName: {
    marginRight: '10px',
  },
  logoutButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4d4d',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  cartCount: {
    color: 'red',
    marginLeft: '5px',
  },
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  products: state.products.filteredProducts || [],
  cart: state.cart.cart || [], // Sepet durumu
});

const mapDispatchToProps = {
  clearUser,
  setUser,
  setFilteredProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
