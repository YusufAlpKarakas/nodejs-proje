const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./sayfalar/products'); // Ürün rotaları
const usersRouter = require('./sayfalar/users'); // Kullanıcı rotaları
const favoritesRouter = require('./sayfalar/favorites'); // Favori rotaları
const categoriesRouter = require('./sayfalar/kategori');
const cors = require('cors');
require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

// MongoDB bağlantı dizesi
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/veritabani';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database bağlantısı kuruldu");
})
.catch((error) => {
  console.error("Database bağlantı hatası:", error);
});

// Middleware'leri kullan
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Frontend portlarınızı ekleyin
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotaları kullan
app.use('/products', productsRouter);
app.use('/users', usersRouter); // /users rotalarını ekleyin
app.use('/favorites', favoritesRouter); // /favorites rotalarını ekleyin
app.use('/categories', categoriesRouter);

// Sunucuyu dinle
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
