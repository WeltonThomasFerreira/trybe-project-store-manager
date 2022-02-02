const express = require('express');
const insertProduct = require('../controllers/productsController');

const router = express.Router();
router.route('/').post(insertProduct);

module.exports = router;
