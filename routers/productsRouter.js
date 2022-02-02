const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);
router
  .route('/:id')
  .get(getProductById);

module.exports = router;
