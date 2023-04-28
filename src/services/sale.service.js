const { saleModel } = require('../models');
const { validateSaleInput } = require('./validations/validateSaleInput');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (sale.length <= 0) return { type: 404, message: 'Sale not found' };

  return { type: null, message: sale };
};

const insert = async (salesArray) => {
  const error = await validateSaleInput(salesArray);
  if (error.type) return error;

  const insertId = await saleModel.insertOnSalesTable();

  const allPromises = salesArray.map((sale) => saleModel
    .insertOnSalesProductsTable(sale.productId, sale.quantity, insertId));

  await Promise.all(allPromises);

  const saleAndProduct = await saleModel.findSaleAndProductsById(insertId);
  const itemsSold = saleAndProduct.map((item) => ({ ...item, quantity: Number(item.quantity) }));

  const result = { id: insertId, itemsSold };
  return { type: null, message: result };
};

module.exports = {
  insert,
  findAll,
  findById,
};