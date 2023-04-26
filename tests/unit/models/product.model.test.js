const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { productModel } = require('../../../src/models');
const { allProducts, oneProduct } = require('./mocks/product.model.mock');

describe('Testes de model de produtos', function () {
  describe('Testes da função findAll', function () { 
    it('Recuperando a lista de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const products = await productModel.findAll();
      expect(products).to.be.deep.equal(allProducts);
    });
  })
  describe('Testes da função findById', function () {
    it('Recuperando um produto a partir do seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[oneProduct]]);
      const product = await productModel.findById();
      expect(product).to.be.deep.equal(oneProduct);
    });

    it('Retorna undefined ao pesquisar por produto que não existe', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);
      const productNotFound = await productModel.findById(999);
      expect(productNotFound).to.be.equal(undefined);
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});