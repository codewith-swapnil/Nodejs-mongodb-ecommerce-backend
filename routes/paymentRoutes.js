const express = require('express');
const router = express.Router();
const { initiatePayment } = require('../controllers/paymentController');

router.post('/', initiatePayment);

module.exports = router;