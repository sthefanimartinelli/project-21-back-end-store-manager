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

  describe('Testes da função insert', function () {
    it('Insere um produto corretamente e retorna o id', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 7 }]);
      const productId = await productModel.insert('Laço da mulher maravilha');
      expect(productId).to.be.equal(7);
    });
  })

  describe('Testes da função update', function () {
    it('Altera corretamente um produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productModel.update(1, 'Laço da mulher maravilha');
      expect(result.affectedRows).to.be.equal(1);
    });
  })

  describe('Testes da função delete', function () {
    it('Deleta corretamente um produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productModel.deleteProduct(1);
      expect(result.affectedRows).to.be.equal(1);
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});