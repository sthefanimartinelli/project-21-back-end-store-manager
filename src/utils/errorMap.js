const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  // PRODUCT_NOT_FOUND: 400,
  // INVALID_VALUE: 422,
  // TRAVEL_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};