const connection = require('./connection');

const SERVER_ERROR = { code: 500, message: 'Internal Server Error' };

const searchProductByName = async (name) => {
  const SELECT_PRODUCT = 'SELECT name FROM StoreManager.products WHERE name LIKE ?';
  try {
    const [rows] = await connection.execute(SELECT_PRODUCT, [name]);
    return rows[0];
  } catch (error) {
    throw SERVER_ERROR;
  }
};

const createProduct = async (name, quantity) => {
  const INSERT_PRODUCT = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  try {
    const [rows] = await connection.execute(INSERT_PRODUCT, [name, quantity]);
    return rows;
  } catch (error) {
    throw SERVER_ERROR;
  }
};

const getAllProducts = async () => {
  const SELECT_PRODUCTS = 'SELECT * FROM StoreManager.products';
  try {
    const [rows] = await connection.execute(SELECT_PRODUCTS);
    return rows;
  } catch (error) {
    throw SERVER_ERROR;
  }
};

const getProductById = async (id) => {
  const SELECT_PRODUCT_BY_ID = 'SELECT * FROM StoreManager.products WHERE id LIKE ?';
  try {
    const [rows] = await connection.execute(SELECT_PRODUCT_BY_ID, [id]);
    return rows[0];
  } catch (error) {
    throw SERVER_ERROR;
  }
};

const updateProductById = async (id, name, quantity) => {
  const UPDATE_PRODUCT_BY_ID = `UPDATE StoreManager.products 
  SET name = ?, quantity = ? WHERE id = ?`;
  try {
    const [rows] = await connection.execute(UPDATE_PRODUCT_BY_ID, [
      name,
      quantity,
      id,
    ]);
    return rows.affectedRows;
  } catch (error) {
    throw SERVER_ERROR;
  }
};

module.exports = {
  searchProductByName,
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
};
