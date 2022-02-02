const SalesModel = require('../models/salesModel');
const ProductsService = require('./productsService');

const error = {
  ID_IS_REQUIRED: { code: 400, message: '"product_id" is required' },
  QUANTITY_IS_REQUIRED: { code: 400, message: '"quantity" is required' },
  QUANTITY_MUST_BE_NUMBER: {
    code: 422,
    message: '"quantity" must be a number larger than or equal to 1',
  },
};

const product = async (arg) => ({
  isUndefined: (data = arg) => !data && data !== 0,
  isNotNumber: (data = arg) => typeof data !== 'number' || data <= 0,
  doesNotExist: async (id = arg) => ProductsService.getProductById(id),
});

const createSale = async (products) => {
  const productIdKey = 'product_id';
  console.log(products);
  try {
    // validateProductId(products);
    // validateProductQuantity(products);
    const saleId = await SalesModel.createSale();
    console.log(saleId);
    const newSale = products.map((item) => [saleId, item[0], item[1]]);
    await SalesModel.createSalesProducts(newSale);
    const sales = await SalesModel.getSalesById(saleId);
    const items = sales.map((sale) => ({
      [productIdKey]: sale.product_id,
      quantity: sale.quantity,
    }));
    return { code: 200, message: { id: saleId, itemsSold: items } };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// [sales.product_id, sales.quantity]

module.exports = { createSale };
