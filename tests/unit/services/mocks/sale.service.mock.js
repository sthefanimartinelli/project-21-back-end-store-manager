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

const allSales = [
  {
    "saleId": 1,
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const oneSale = [
  {
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-04-28T22:57:15.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const oneSaleFromTableSale = {
  id: 1,
  date: "2023-04-28T22:57:15.000Z",
};

const update = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const resultOfUpdate = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
};

module.exports = {
  saleToInsert,
  resultInsertSale,
  wrongSaleToInsert,
  allSales,
  oneSale,
  oneSaleFromTableSale,
  resultOfUpdate,
  update,
}