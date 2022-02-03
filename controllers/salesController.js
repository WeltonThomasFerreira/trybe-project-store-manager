const SalesService = require('../services/salesService');

const mapSales = (sales) =>
  sales.map((product) => [product.product_id, product.quantity]);

const createSale = async (req, res) => {
  const sale = mapSales(req.body);
  try {
    const { code, message } = await SalesService.createSale(sale);
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const { code, message } = await SalesService.getAllSales();
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const { code, message } = await SalesService.getSaleById(id);
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = mapSales(req.body);
  try {
    const { code, message } = await SalesService.updateSaleById(id, sale);
    return res.status(code).json(message);
  } catch ({ code, message }) {
    return res.status(code).json({ message });
  }
};

module.exports = { createSale, getAllSales, getSaleById, updateSaleById };
