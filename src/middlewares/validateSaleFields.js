const validateSaleFields = (req, res, next) => {
  const salesArray = req.body;

  for (let index = 0; index < salesArray.length; index += 1) {
    const sale = salesArray[index];
    if (!sale.productId) {
      return res.status(400).json({ message: '"productId" is required' });
    } if (sale.quantity === undefined) { 
      return res.status(400).json({ message: '"quantity" is required' });   
    } 
  }

  next();
};

module.exports = {
  validateSaleFields,
};