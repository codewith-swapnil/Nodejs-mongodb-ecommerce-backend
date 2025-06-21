const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const product = new Product({ ...req.body, user: req.user._id });
  await product.save();
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || !product.user.equals(req.user._id)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
};