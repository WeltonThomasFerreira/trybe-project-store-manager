const SalesService = require('../services/salesService');

const createSale = async (req, res) => {
  const sale = req.body.map((product) => [
    product.product_id,
    product.quantity,
  ]);
  try {
    const { code, message } = await SalesService.createSale(sale);
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

module.exports = createSale;
