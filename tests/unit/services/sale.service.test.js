const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel, productModel } = require('../../../src/models');
const { saleToInsert, resultInsertSale, wrongSaleToInsert, allSales, oneSale,
  oneSaleFromTableSale, resultOfUpdate, update } = require('./mocks/sale.service.mock');
const { oneProduct, secondProduct } = require('./mocks/product.service.mock');
const { validateSaleInput } = require('../../../src/services/validations/validateSaleInput');

describe('Testes de services de sales', function () {
  describe('Testes da função insert', function () {
    it('Recebe um objeto com informação de quantidade menor que 0 e retorna um erro', async function () {
      const products = await saleService.insert(wrongSaleToInsert);

      expect(products.type).to.be.equal(422);
      expect(products.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('Insere um sale corretamente e retorna um objeto', async function () {
      sinon.stub(saleModel, 'findSaleById').onFirstCall().returns({ id: 1, date: '2023-04-28T22:57:15.000Z' })
        .onSecondCall().returns({ id: 1, date: '2023-04-28T22:57:15.000Z' });
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

  describe('Testes da função delete', function () {
    it('Deleta produto corretamente', async function () {
      sinon.stub(saleModel, 'deleteSale').resolves({ affectedRows: 1 });
      const deleteSale = await saleService.deleteSale(1);

      expect(deleteSale.type).to.be.equal(null);
      expect(deleteSale.message).to.be.deep.equal('');
    });

    it('Não encontra a sale e retorna erro', async function () {
      sinon.stub(saleModel, 'deleteSale').resolves({ affectedRows: 0 });
      const deleteSale = await saleService.deleteSale(999);

      expect(deleteSale.type).to.be.equal(404);
      expect(deleteSale.message).to.be.deep.equal('Sale not found');
    });
  })

  describe('Testes da função update', function () {
    it('Atualiza sale corretamente', async function () {
      sinon.stub(saleModel, 'findSaleById').resolves(oneSaleFromTableSale);
      sinon.stub(productModel, 'findById').onFirstCall().returns(oneProduct)
        .onSecondCall().returns(secondProduct);
      sinon.stub(saleModel, 'updateOnSalesProductsTable').resolves();
      const updateSale = await saleService.updateSale(1, update);
      
      expect(updateSale.type).to.be.equal(null);
      expect(updateSale.message).to.be.deep.equal(resultOfUpdate);
    });

    it('Não encontra a sale e retorna erro', async function () {
      sinon.stub(saleModel, 'findSaleById').resolves();
      const updateSale = await saleService.updateSale(999);

      expect(updateSale.type).to.be.equal(404);
      expect(updateSale.message).to.be.deep.equal('Sale not found');
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});