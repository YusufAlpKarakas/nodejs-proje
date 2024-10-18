const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// Kullanıcının favori ürünlerini al
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'User ID gerekli.' });
  }

  try {
    let favorite = await Favorite.findOne({ userId }).populate('products');
    if (!favorite) {
      favorite = new Favorite({ userId, products: [] });
      await favorite.save();
    }
    res.status(200).json(favorite.products);
  } catch (error) {
    res.status(500).json({ message: 'Favori ürünler alınamadı.', error: error.message });
  }
});

// Favori ürünü ekle
router.post('/', async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    return res.status(400).json({ message: 'User ID ve Product ID gerekli.' });
  }

  try {
    let favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      favorite = new Favorite({ userId, products: [productId] });
    } else {
      if (favorite.products.includes(productId)) {
        return res.status(400).json({ message: 'Ürün zaten favorilerde.' });
      }
      favorite.products.push(productId);
    }
    await favorite.save();
    res.status(200).json({ message: 'Ürün favorilere eklendi.', favorite });
  } catch (error) {
    res.status(500).json({ message: 'Favori ürün eklenemedi.', error: error.message });
  }
});

// Favori ürünü kaldır
router.delete('/:productId', async (req, res) => {
  const { userId } = req.query;
  const { productId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID gerekli.' });
  }

  try {
    let favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      return res.status(400).json({ message: 'Favori listesi bulunamadı.' });
    }

    favorite.products = favorite.products.filter(id => id.toString() !== productId);
    await favorite.save();
    res.status(200).json({ message: 'Ürün favorilerden kaldırıldı.', favorite });
  } catch (error) {
    res.status(500).json({ message: 'Favori ürünü kaldırılamadı.', error: error.message });
  }
});

module.exports = router;
