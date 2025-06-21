const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const paymentRoutes = require('./paymentRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', authMiddleware, productRoutes);
router.use('/payments', authMiddleware, paymentRoutes);

module.exports = router;
