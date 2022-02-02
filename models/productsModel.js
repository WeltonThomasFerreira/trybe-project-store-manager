const connection = require('./connection');

const SERVER_ERROR = { status: 500, message: 'Internal Server Error' };

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

module.exports = { searchProductByName, createProduct };
