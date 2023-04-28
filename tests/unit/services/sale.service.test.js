const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { saleToInsert, resultInsertSale, wrongSaleToInsert } = require('./mocks/sale.service.mock');

describe('Testes de services de sales', function () {
  describe('Testes da função insert', function () {
    it('Recebe um objeto com informação de quantidade menor que 0 e retorna um erro', async function () {
      const products = await saleService.insert(wrongSaleToInsert);

      expect(products.type).to.be.equal(422);
      expect(products.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });
    it('Insere um produto corretamente e retorna um objeto', async function () {
      sinon.stub(saleModel, 'insertOnSalesTable').resolves(3);
      sinon.stub(saleModel, 'insertOnSalesProductsTable').resolves();
      sinon.stub(saleModel, 'findSaleAndProductsById').resolves(saleToInsert);
      const saleAndProduct = await saleService.insert(saleToInsert);

      expect(saleAndProduct.type).to.be.equal(null);
      expect(saleAndProduct.message).to.be.deep.equal(resultInsertSale);
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});