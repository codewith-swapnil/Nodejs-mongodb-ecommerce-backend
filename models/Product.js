const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Product', ProductSchema);