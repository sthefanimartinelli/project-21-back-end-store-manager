const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productService.findAll();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { message } = await productService.insert(name);

  // if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  insert,
};