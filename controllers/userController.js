const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  user.password = undefined; // Remove password from response
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ status: 200, user, token, message: 'User logged in successfully' });
};
