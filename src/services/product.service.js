const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const insert = async (name) => {
  const newProductId = await productModel.insert(name);
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const update = async (id, name) => {
  const result = await productModel.update(id, name);
  if (result.affectedRows <= 0) {
    return { type: 404, message: 'Product not found' };
  }
  const updatedProduct = await productModel.findById(id);
  return { type: null, message: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};