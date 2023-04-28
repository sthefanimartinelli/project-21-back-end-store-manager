const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { saleToInsert, resultInsertSale, wrongSaleToInsert, allSales, oneSale } = require('./mocks/sale.service.mock');

describe('Testes de services de sales', function () {
  describe('Testes da função insert', function () {
    it('Recebe um objeto com informação de quantidade menor que 0 e retorna um erro', async function () {
      const products = await saleService.insert(wrongSaleToInsert);

      expect(products.type).to.be.equal(422);
      expect(products.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });
    it('Insere um sale corretamente e retorna um objeto', async function () {
      sinon.stub(saleModel, 'insertOnSalesTable').resolves(3);
      sinon.stub(saleModel, 'insertOnSalesProductsTable').resolves();
      sinon.stub(saleModel, 'findSaleAndProductsById').resolves(saleToInsert);
      const saleAndProduct = await saleService.insert(saleToInsert);

      expect(saleAndProduct.type).to.be.equal(null);
      expect(saleAndProduct.message).to.be.deep.equal(resultInsertSale);
    });
  })

  describe('Testes da função findAll', function () {
    it('Recuperando a lista de sales', async function () {
      sinon.stub(saleModel, 'findAll').resolves(allSales);
      const sales = await saleService.findAll();

      expect(sales.type).to.be.equal(null);
      expect(sales.message).to.be.deep.equal(allSales);
    });
  })

  describe('Testes da função findById', function () {
    it('Recuperando um sale a partir do seu id', async function () {
      sinon.stub(saleModel, 'findById').resolves(oneSale);
      const sale = await saleService.findById(1);

      expect(sale.type).to.be.equal(null);
      expect(sale.message).to.be.deep.equal(oneSale);
    });

    it('Retorna um array vazio ao pesquisar por sale que não existe', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);
      const saleNotFound = await saleService.findById(1);

      expect(saleNotFound.type).to.be.equal(404);
      expect(saleNotFound.message).to.be.deep.equal('Sale not found');
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});