import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/forgot-password', { email });
      setMessage(response.data.message);
      if (response.data.message === 'E-posta gönderildi!') {
        setStep(2); // Kodu girme adımına geç
      }
    } catch (error) {
      setMessage('E-posta gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/reset-password', { email, code, newPassword });
      setMessage(response.data.message);
      navigate('/login'); // Şifre güncellendikten sonra login sayfasına yönlendir
    } catch (error) {
      setMessage('Şifre güncellenemedi. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="forgot-password-container">
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2>Parola Sıfırlama</h2>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Kod Gönder</button>
          {message && <p>{message}</p>}
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <h2>Kodunuzu Girin</h2>
          <input
            type="text"
            placeholder="Kod"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Yeni Şifre"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Şifreyi Güncelle</button>
          {message && <p>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
