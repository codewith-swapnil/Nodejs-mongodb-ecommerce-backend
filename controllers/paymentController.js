const mongoose = require('mongoose');
const Product = require('../models/Product');

exports.initiatePayment = async (req, res) => {
  const { product_id, payment_method } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = await Product.findById(product_id).session(session);
    if (!product || product.quantity < 1) {
      throw new Error('Product unavailable');
    }
    product.quantity -= 1;
    await product.save();
    console.log(`Initiated ${payment_method} for product ${product._id}`);
    await session.commitTransaction();
    session.endSession();
    res.json({ message: 'Payment initiated' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message });
  }
};