const ProductsService = require('../services/productsService');

const insertProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const { status, message } = await ProductsService.createProduct(name, quantity);
    return res.status(status).json(message);
  } catch ({ status, message }) {
    return res.status(status).json({ message });
  }
};

module.exports = insertProduct;
