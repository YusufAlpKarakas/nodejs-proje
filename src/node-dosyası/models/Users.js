const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetCode: {
    type:String
  },
});

// Kullanıcı modelini oluştur
const User = mongoose.model('Users', userSchema);

module.exports = User;
