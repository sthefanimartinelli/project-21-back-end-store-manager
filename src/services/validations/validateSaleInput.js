const { saleModel } = require('../../models');

const validateSaleInput = async (salesArray) => {
  for (let index = 0; index < salesArray.length; index += 1) {
    const sale = salesArray[index];
    if (sale.quantity <= 0) {
      return { type: 422, message: '"quantity" must be greater than or equal to 1' };
    }
  }

  const idsMapped = salesArray.map((sale) => saleModel.findSaleById(sale.productId));
  const results = await Promise.all(idsMapped);

  const anyIdIsUndefined = results.some((result) => result === undefined);

  if (anyIdIsUndefined) return { type: 404, message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateSaleInput,
};