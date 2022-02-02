const ProductsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const { code, message } = await ProductsService.createProduct(
      name,
      quantity,
    );
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { code, message } = await ProductsService.getAllProducts();
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const { code, message } = await ProductsService.getProductById(id);
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById };
