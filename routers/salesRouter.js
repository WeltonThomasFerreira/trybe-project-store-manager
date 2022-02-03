const express = require('express');
const {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
} = require('../controllers/salesController');

const router = express.Router();

router.route('/').post(createSale).get(getAllSales);
router.route('/:id').get(getSaleById).put(updateSaleById);

module.exports = router;
