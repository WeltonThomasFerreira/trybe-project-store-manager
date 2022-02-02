const ProductsModel = require('../models/productsModel');

const error = {
  NAME_IS_REQUIRED: { code: 400, message: '"name" is required' },
  NAME_IS_INVALID: {
    code: 422,
    message: '"name" length must be at least 5 characters long',
  },
  PRODUCT_ALREADY_EXISTS: { code: 409, message: 'Product already exists' },
  QUANTITY_IS_REQUIRED: { code: 400, message: '"quantity" is required' },
  QUANTITY_MUST_BE_NUMBER: {
    code: 422,
    message: '"quantity" must be a number larger than or equal to 1',
  },
  PRODUCT_NOT_FOUND: { code: 404, message: 'Product not found' },
};

const product = (arg) => ({
  isUndefined: (data = arg) => !data && data !== 0,
  isInvalid: (data = arg) => typeof data !== 'string' || data.length < 5,
  alreadyExists: async (data = arg) => ProductsModel.searchProductByName(data),
  isNotNumber: (data = arg) => typeof data !== 'number' || data <= 0,
});

const database = (arg) => ({
  productIsNotFound: (data = arg) => !data,
  alreadyExists: async (data = arg) => ProductsModel.searchProductByName(data),
});

const validateProductName = (name) => {
  if (product(name).isUndefined()) throw error.NAME_IS_REQUIRED;
  if (product(name).isInvalid()) throw error.NAME_IS_INVALID;
  return true;
};

const validateProductQuantity = (quantity) => {
  if (product(quantity).isUndefined()) throw error.QUANTITY_IS_REQUIRED;
  if (product(quantity).isNotNumber()) throw error.QUANTITY_MUST_BE_NUMBER;
  return true;
};

const createProduct = async (name, quantity) => {
  try {
    validateProductName(name);
    if (await database(name).alreadyExists()) {
      throw error.PRODUCT_ALREADY_EXISTS;
    }
    validateProductQuantity(quantity);
    const { insertId } = await ProductsModel.createProduct(name, quantity);
    return { code: 201, message: { id: insertId, name, quantity } };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getAllProducts = async () => {
  try {
    const products = await ProductsModel.getAllProducts();
    return { code: 200, message: products };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getProductById = async (id) => {
  try {
    const response = await ProductsModel.getProductById(id);
    if (database(response).productIsNotFound()) throw error.PRODUCT_NOT_FOUND;
    return { code: 200, message: response };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateProductById = async (id, name, quantity) => {
  try {
    validateProductName(name);
    validateProductQuantity(quantity);
    await getProductById(id);
    await ProductsModel.updateProductById(id, name, quantity);
    const { code, message } = await getProductById(id);
    return { code, message };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const deleteProductById = async (id) => {
  try {
    const { code, message } = await getProductById(id);
    await ProductsModel.deleteProductById(id);
    return { code, message };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
