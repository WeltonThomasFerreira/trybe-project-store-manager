const SalesModel = require('../models/salesModel');

const error = {
  ID_IS_REQUIRED: { code: 400, message: '"product_id" is required' },
  QUANTITY_IS_REQUIRED: { code: 400, message: '"quantity" is required' },
  QUANTITY_MUST_BE_NUMBER: {
    code: 422,
    message: '"quantity" must be a number larger than or equal to 1',
  },
  SALE_NOT_FOUND: { code: 404, message: 'Sale not found' },
};

const validateProductId = (products) => {
  if (products.some((product) => !product[0])) throw error.ID_IS_REQUIRED;
  return true;
};

const validateProductQuantity = (products) => {
  if (products.some((product) => !product[1] && product[1] !== 0)) {
    throw error.QUANTITY_IS_REQUIRED;
  }
  if (
    products.some(
      (product) => product[1] <= 0 || typeof product[1] !== 'number',
    )
  ) {
    throw error.QUANTITY_MUST_BE_NUMBER;
  }
  return true;
};

const createSale = async (products) => {
  const productIdKey = 'product_id';
  try {
    validateProductId(products);
    validateProductQuantity(products);
    const saleId = await SalesModel.createSale();
    const newSale = products.map((item) => [saleId, item[0], item[1]]);
    await SalesModel.createSalesProducts(newSale);
    const sales = await SalesModel.getSalesById(saleId);
    const items = sales.map((sale) => ({
      [productIdKey]: sale.product_id,
      quantity: sale.quantity,
    }));
    return { code: 201, message: { id: saleId, itemsSold: items } };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getAllSales = async () => {
  try {
    const sales = await SalesModel.getAllSales();
    return { code: 200, message: sales };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getSaleById = async (id) => {
  try {
    const response = await SalesModel.getSalesById(id);
    if (!response[0]) throw error.SALE_NOT_FOUND;
    return { code: 200, message: response };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateSaleById = async (id, products) => {
  const productIdKey = 'product_id';
  try {
    validateProductId(products);
    validateProductQuantity(products);
    await SalesModel.updateSaleById(id, ...products);
    const sales = await SalesModel.getSalesById(id);
    const items = sales.map((sale) => ({
      [productIdKey]: sale.product_id,
      quantity: sale.quantity,
    }));
    return { code: 200, message: { id, itemsUpdated: items } };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { createSale, getAllSales, getSaleById, updateSaleById };
