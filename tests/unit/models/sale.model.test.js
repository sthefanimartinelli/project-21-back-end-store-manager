const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const { saleModel } = require('../../../src/models');
const { allProducts, oneProduct } = require('./mocks/product.model.mock');

describe('Testes de model de sales', function () {
  // describe('Testes da função findAll', function () {
  //   it('Recuperando a lista de produtos', async function () {
  //     sinon.stub(connection, 'execute').resolves([allProducts]);
  //     const products = await saleModel.findAll();
  //     expect(products).to.be.deep.equal(allProducts);
  //   });
  // })
  describe('Testes da função de validação do service validateSaleInput', function () {
    it('Quando recebe quantity menor que 0', async function () {
      sinon.stub(connection, 'execute').resolves([[oneProduct]]);
      const product = await saleModel.findById();
      expect(product).to.be.deep.equal(oneProduct);
    });

    it('Retorna undefined ao pesquisar por produto que não existe', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);
      const productNotFound = await saleModel.findById(999);
      expect(productNotFound).to.be.equal(undefined);
    });
  })

  // describe('Testes da função insert', function () {
  //   it('Insere um produto corretamente e retorna o id', async function () {
  //     sinon.stub(connection, 'execute').resolves([{ insertId: 7 }]);
  //     const productId = await saleModel.insert('Laço da mulher maravilha');
  //     expect(productId).to.be.equal(7);
  //   });
  // })

  afterEach(function () {
    sinon.restore();
  });
});