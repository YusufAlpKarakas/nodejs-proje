import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../aksiyonlar/actions';

const Singin = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailLower = email.toLowerCase();
      const response = await axios.post('http://localhost:5000/users/register', { name, email: emailLower, password });
      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage('Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/');
        }, 2000); // 2 saniye sonra yönlendirme
      } else {
        setMessage('Kayıt başarılı! Giriş yapmak için Login sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2 saniye sonra yönlendirme
      }
    } catch (error) {
      setMessage('Kayıt oluşturulamadı. Lütfen tekrar deneyin.');
      console.error('Kayıt hatası:', error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Kayıt Ol</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(Singin);
