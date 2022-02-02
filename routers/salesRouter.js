const express = require('express');
const createSale = require('../controllers/salesController');

const router = express.Router();

router.route('/').post(createSale);

module.exports = router;
