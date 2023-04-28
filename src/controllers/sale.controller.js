const { saleService } = require('../services');

const insert = async (req, res) => {
  const salesArray = req.body;
  const { type, message } = await saleService.insert(salesArray);

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const findAll = async (_req, res) => {
  const { message } = await saleService.findAll();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  insert,
  findAll, 
  findById,
};