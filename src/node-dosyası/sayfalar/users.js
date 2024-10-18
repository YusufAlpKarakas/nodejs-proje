const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

// E-posta gönderimi için ayarları yapılandır
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Kayıt (Sign-up) Rotası
router.post('/register', async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email = email.toLowerCase(); // E-posta adresini küçük harfe çevir

    // Kullanıcı var mı kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta zaten kullanılıyor.' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Kayıt başarılı! Giriş yapmak için Login sayfasına gidin.' });
  } catch (error) {
    console.error('Register hatası:', error);
    res.status(500).json({ message: 'Kayıt oluşturulamadı. Lütfen tekrar deneyin.' });
  }
});

// Giriş (Login) Rotası
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase(); // E-posta adresini küçük harfe çevir

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Giriş başarısız. E-posta veya şifre yanlış.' });
    }

    // Şifreyi karşılaştır
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Giriş başarısız. E-posta veya şifre yanlış.' });
    }

    // Kullanıcı bilgilerini döndür
    res.json({ user: { id: user._id, name: user.name, email: user.email }, message: 'Giriş başarılı!' });
  } catch (error) {
    console.error('Login hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
});

// Parola sıfırlama kodu gönderme
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Bu e-posta adresine ait bir kullanıcı bulunamadı.' });
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli kod
  user.resetCode = resetCode; 
  await user.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Parola Sıfırlama Kodu',
    text: `Parola sıfırlama kodunuz: ${resetCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'E-posta gönderilemedi.' });
    }
    res.status(200).json({ message: 'E-posta gönderildi!' });
  });
});

// Şifre sıfırlama
router.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code) {
    return res.status(400).json({ message: 'Kod geçersiz.' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetCode = null; // Kodu sıfırla
  await user.save();

  res.status(200).json({ message: 'Şifre başarıyla güncellendi.' });
});

// Kullanıcıyı güncelleme
router.put('/update', async (req, res) => {
  const { id, name, email } = req.body;
  
  try {
    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json({ message: 'Kullanıcı bilgileri güncellendi.', user });
  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    res.status(500).json({ message: 'Kullanıcı güncellenemedi. Lütfen tekrar deneyin.' });
  }
});

// Kullanıcıyı silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json({ message: 'Kullanıcı başarıyla silindi.' });
  } catch (error) {
    console.error('Kullanıcı silme hatası:', error);
    res.status(500).json({ message: 'Kullanıcı silinemedi. Lütfen tekrar deneyin.' });
  }
});

module.exports = router;
