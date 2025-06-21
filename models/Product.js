const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,       // Adds createdAt and updatedAt
    versionKey: false       // Removes __v
  }
);

module.exports = mongoose.model('Product', ProductSchema);