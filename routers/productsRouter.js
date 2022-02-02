const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(updateProductById);

module.exports = router;
