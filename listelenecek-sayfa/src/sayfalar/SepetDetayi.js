import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../aksiyonlar/actions'; 

class SepetDetayi extends Component {
  handleRemove = (productId) => {
    this.props.removeFromCart(productId); 
  };

  render() {
    const { cart } = this.props;

    // Ürünleri grup olarak gösterme
    const groupedCart = cart.reduce((acc, product) => {
      const existingProduct = acc.find(item => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1; 
      } else {
        acc.push({ ...product, quantity: 1 }); 
      }
      return acc;
    }, []);

    return (
      <div className="sepet-detayi-container">
        <h2>Sepet Detayı</h2>
        {groupedCart.length > 0 ? (
          <div>
            <ul className="sepet-listesi">
              {groupedCart.map((product) => (
                <li key={product._id} className="sepet-urunu">
                  <h3 className="urun-adi">{product.name}</h3>
                  <p className="urun-fiyat">Fiyat: {product.price} TL</p>
                  <p className="urun-miktar">Miktar: {product.quantity}</p>
                  <button
                    className="sil-buton"
                    onClick={() => this.handleRemove(product._id)}
                  >
                    Ürünü Sil
                  </button>
                </li>
              ))}
            </ul>
            <p className="toplam-fiyat">
              Toplam: {groupedCart.reduce((total, product) => total + (product.price * product.quantity), 0)} TL
            </p>
          </div>
        ) : (
          <p>Sepetinizde henüz ürün yok.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart || [], 
});

const mapDispatchToProps = {
  removeFromCart, 
};

export default connect(mapStateToProps, mapDispatchToProps)(SepetDetayi);
