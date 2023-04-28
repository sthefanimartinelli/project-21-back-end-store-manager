const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { saleModel } = require('../../../src/models');
const { saleInfoMock, saleToInsert, resultInsertSale } = require('./mocks/sale.model.mock');

describe('Testes de model de sales', function () {
  describe('Testes da função findSaleById', function () {
    it('Retorna o objeto referente à venda corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([[saleInfoMock]]);
      const sale = await saleModel.findSaleById(1);
      expect(sale).to.be.deep.equal(saleInfoMock);
    });
  })
  
  describe('Testes da função insertOnSalesTable', function () {
    it('Insere corretamente uma nova sale na tabela sales e retorna um id', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      const sale = await saleModel.insertOnSalesTable(saleToInsert);
      expect(sale).to.be.deep.equal(3);
    });
  })

  describe('Testes da função insertOnSalesProductsTable', function () {
    it('Insere corretamente uma nova sale na tabela sales_products e retorna um id', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      const sale = await saleModel.insertOnSalesProductsTable(1, 4, 2);
      expect(sale).to.be.deep.equal(3);
    });
  })

  describe('Testes da função findSaleAndProductsById', function () {
    it('Retorna um array referente à uma sale na tabela sales_products', async function () {
      sinon.stub(connection, 'execute').resolves([resultInsertSale]);
      const saleAndProduct = await saleModel.findSaleAndProductsById(3);
      expect(saleAndProduct).to.be.deep.equal(resultInsertSale);
    });
  })
  
  afterEach(function () {
    sinon.restore();
  });
});