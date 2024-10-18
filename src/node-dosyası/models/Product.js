const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Kategori referansı
});

module.exports = mongoose.model("Product", ProductSchema);
