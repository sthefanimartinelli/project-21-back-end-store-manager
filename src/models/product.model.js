const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
     ORDER BY id`,
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (id, name) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};