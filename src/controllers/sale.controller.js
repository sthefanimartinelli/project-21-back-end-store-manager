const { saleService } = require('../services');

const insert = async (req, res) => {
  const salesArray = req.body;
  const { type, message } = await saleService.insert(salesArray);

  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  insert,
};