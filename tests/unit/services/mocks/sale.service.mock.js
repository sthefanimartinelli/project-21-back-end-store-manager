const wrongSaleToInsert = [
  {
    "productId": 1,
    "quantity": -1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const saleToInsert = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const resultInsertSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  saleToInsert,
  resultInsertSale,
  wrongSaleToInsert,
}