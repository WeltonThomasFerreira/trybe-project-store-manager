const connection = require('./connection');

const SERVER_ERROR = { code: 500, message: 'Internal Server Error' };

const createSale = async () => {
  const CREATE_SALE = 'INSERT INTO StoreManager.sales (id) VALUES (DEFAULT)';
  try {
    const [rows] = await connection.execute(CREATE_SALE);
    return rows.insertId;
  } catch (error) {
    console.log(error);
    throw SERVER_ERROR;
  }
};

const createSalesProducts = async (sales) => {
  const INSERT_SALE = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES ?`;
  try {
    const [rows] = await connection.query(INSERT_SALE, [sales]);
    return rows;
  } catch (error) {
    console.log(error);
    throw SERVER_ERROR;
  }
};

const getAllSales = async () => {
  const SELECT_ALL_SALES = `SELECT s.id AS saleId, s.date, sp.product_id, sp.quantity 
  FROM StoreManager.sales AS s 
  INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id`;
  try {
    const [rows] = await connection.execute(SELECT_ALL_SALES);
    return rows;
  } catch (error) {
    console.log(error);
    throw SERVER_ERROR;
  }
};

const getSalesById = async (id) => {
  const SELECT_SALES_BY_ID = `SELECT s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales AS s 
    INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?`;
  try {
    const [rows] = await connection.execute(SELECT_SALES_BY_ID, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw SERVER_ERROR;
  }
};

module.exports = { createSale, createSalesProducts, getAllSales, getSalesById };
