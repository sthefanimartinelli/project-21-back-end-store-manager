const connection = require('../db/connection');

const findSaleAndProductsById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT product_id AS productId, SUM(quantity) AS quantity FROM StoreManager.sales_products
      WHERE sale_id = ?
      GROUP BY productId;`,
    [saleId],
  );
  console.log(result);
  return result;
};

const findSaleById = async (saleId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;',
    [saleId],
  );
  return result;
};

const insertOnSalesTable = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ();',
  );
  return insertId;
};

const insertOnSalesProductsTable = async (productId, quantity, saleId) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_id, quantity, sale_id) VALUES (?, ?, ?);',
    [productId, quantity, saleId],
  );
  return result;
};

module.exports = {
  findSaleById,
  findSaleAndProductsById,
  insertOnSalesTable,
  insertOnSalesProductsTable,
};