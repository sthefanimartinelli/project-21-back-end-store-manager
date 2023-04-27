const saleInfoMock = {
  id: 1,
  date: '2023-04-27 20:44:50',
};

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
  saleInfoMock,
  resultInsertSale,
}