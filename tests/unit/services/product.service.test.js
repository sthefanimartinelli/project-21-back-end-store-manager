const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { allProducts, oneProduct } = require('./mocks/product.service.mock');

describe('Testes de services de produtos', function () {
  describe('Testes da função findAll', function () { 
    it('Recuperando a lista de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(allProducts);
      const products = await productService.findAll();

      expect(products.type).to.be.equal(null);
      expect(products.message).to.be.deep.equal(allProducts);
    });
  })
  describe('Testes da função findById', function () {
    it('Recuperando um produto a partir do seu id', async function () {
      sinon.stub(productModel, 'findById').resolves(oneProduct);
      const product = await productService.findById(1);

      expect(product.type).to.be.equal(null);
      expect(product.message).to.be.deep.equal(oneProduct);
    });

    it('Retorna um array vazio ao pesquisar por produto que não existe', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const productNotFound = await productService.findById(1);

      expect(productNotFound.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(productNotFound.message).to.be.deep.equal('Product not found');
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});