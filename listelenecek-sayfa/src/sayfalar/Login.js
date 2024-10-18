import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../aksiyonlar/actions';
import '../styles/login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailLower = email.toLowerCase();
      const response = await axios.post('http://localhost:5000/users/login', { email: emailLower, password });

      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage('Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setMessage('Giriş başarısız. Lütfen tekrar deneyin veya kayıt oluşturun.');
      console.error('Giriş hatası:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Giriş Yap</h2>
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Giriş Yap</button>
        <p onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer', color: '#007bff' }}>Parolamı Unuttum?</p>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(Login);
