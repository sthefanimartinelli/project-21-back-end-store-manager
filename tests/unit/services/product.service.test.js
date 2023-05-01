const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { allProducts, oneProduct, newProduct, updatedProduct } = require('./mocks/product.service.mock');

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

  describe('Testes da função insert', function () {
    it('Insere um produto corretamente e retorna o novo produto', async function () {
      sinon.stub(productModel, 'insert').resolves(7);
      sinon.stub(productModel, 'findById').resolves(newProduct);
      const products = await productService.insert();

      expect(products.type).to.be.equal(null);
      expect(products.message).to.be.deep.equal(newProduct);
    });
  })

  describe('Testes da função update', function () {
    it('Altera produto corretamente e retorna o produto alterado', async function () {
      sinon.stub(productModel, 'update').resolves({ affectedRows: 1 });
      sinon.stub(productModel, 'findById').resolves(updatedProduct);
      const products = await productService.update(1, 'Laço da mulher maravilha');

      expect(products.type).to.be.equal(null);
      expect(products.message).to.be.deep.equal(updatedProduct);
    });

    it('Não encontra o produto e retorna erro', async function () {
      sinon.stub(productModel, 'update').resolves({ affectedRows: 0 });
      sinon.stub(productModel, 'findById').resolves();
      const products = await productService.update(999, 'Laço da mulher maravilha');

      expect(products.type).to.be.equal(404);
      expect(products.message).to.be.deep.equal('Product not found');
    });
  })

  describe('Testes da função delete', function () {
    it('Deleta produto corretamente', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves({ affectedRows: 1 });
      const deletedProduct = await productService.deleteProduct(1);

      expect(deletedProduct.type).to.be.equal(null);
      expect(deletedProduct.message).to.be.deep.equal('');
    });

    it('Não encontra o produto e retorna erro', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves({ affectedRows: 0 });
      const deletedProduct = await productService.deleteProduct(999);

      expect(deletedProduct.type).to.be.equal(404);
      expect(deletedProduct.message).to.be.deep.equal('Product not found');
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});