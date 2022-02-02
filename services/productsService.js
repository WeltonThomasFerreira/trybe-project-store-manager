const ProductsModel = require('../models/productsModel');

const error = {
  NAME_IS_REQUIRED: { status: 400, message: '"name" is required' },
  NAME_IS_INVALID: {
    status: 422,
    message: '"name" length must be at least 5 characters long',
  },
  PRODUCT_ALREADY_EXISTS: { status: 409, message: 'Product already exists' },
  QUANTITY_IS_REQUIRED: { status: 400, message: '"quantity" is required' },
  QUANTITY_MUST_BE_NUMBER: {
    status: 422,
    message: '"quantity" must be a number larger than or equal to 1',
  },
};

const product = (arg) => ({
  isUndefined: (data = arg) => !data && data !== 0,
  isInvalid: (data = arg) => typeof data !== 'string' || data.length < 5,
  alreadyExists: async (data = arg) => ProductsModel.searchProductByName(data),
  isNotNumber: (data = arg) => typeof data !== 'number' || data <= 0,
});

const validateProductName = async (name) => {
  if (product(name).isUndefined()) throw error.NAME_IS_REQUIRED;
  if (product(name).isInvalid()) throw error.NAME_IS_INVALID;
  if (await product(name).alreadyExists()) throw error.PRODUCT_ALREADY_EXISTS;
  return true;
};

const validateProductQuantity = (quantity) => {
  if (product(quantity).isUndefined()) throw error.QUANTITY_IS_REQUIRED;
  if (product(quantity).isNotNumber()) throw error.QUANTITY_MUST_BE_NUMBER;
  return true;
};

const createProduct = async (name, quantity) => {
  try {
    await validateProductName(name);
    validateProductQuantity(quantity);
    const { insertId } = await ProductsModel.createProduct(name, quantity);
    return { status: 201, message: { id: insertId, name, quantity } };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { createProduct };
