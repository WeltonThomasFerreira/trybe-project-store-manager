const connection = require('./connection');

const searchProductByName = async (name) => {
  const SELECT_PRODUCT = 'SELECT name FROM StoreManager.products WHERE name LIKE ?';
  const [rows] = await connection.execute(SELECT_PRODUCT, [name]);
  return rows[0];
};

const createProduct = async (name, quantity) => {
  const INSERT_PRODUCT = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [rows] = await connection.execute(INSERT_PRODUCT, [name, quantity]);
  return rows;
};

module.exports = { searchProductByName, createProduct };
