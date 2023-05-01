const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT s.id AS saleId, s.date, product_id AS productId, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON sp.sale_id = s.id
      ORDER BY saleId, productId;`,
  );
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    `SELECT s.date, product_id AS productId, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON sp.sale_id = s.id
      WHERE s.id = ?
      ORDER BY s.id, productId;`,
    [productId],
  );
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
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_id, quantity, sale_id) VALUES (?, ?, ?);',
    [productId, quantity, saleId],
  );
  return insertId;
};

const findSaleAndProductsById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT product_id AS productId, SUM(quantity) AS quantity FROM StoreManager.sales_products
      WHERE sale_id = ?
      GROUP BY productId;`,
    [saleId],
  );
  return result;
};

const deleteSaleFromTableSalesProducts = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
      WHERE sale_id = ?`,
    [id],
  );
  return result;
};

const deleteProductFromTableSales = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.sales
      WHERE id = ?`,
    [id],
  );
  return result;
};

const deleteSale = async (id) => { 
  await deleteSaleFromTableSalesProducts(id);
  const result = await deleteProductFromTableSales(id);
  return result;
};

module.exports = {
  findSaleById,
  findSaleAndProductsById,
  insertOnSalesTable,
  insertOnSalesProductsTable,
  findAll,
  findById,
  deleteSale,
};