const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { allProducts, oneProduct, newProduct, updatedProduct } = require('./mocks/product.controller.mock');

describe('Testes de controller de produtos', function () {
  describe('Testes da função findAll', function () {
    it('Deve retornar status 200 e a lista de produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: allProducts });
      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  })
  describe('Testes da função findById', function () {
    it('Deve responder com status 200 e a lista de produtos', async function () {
      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves({ type: null, message: oneProduct });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(oneProduct);
    });

    it('Retorna erro ao passar um id que não existe', async function () {
      const req = {
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  })

  describe('Testes da função insert', function () {
    it('Insere um produto corretamente e retorna o status correto e o novo produto', async function () {
      const req = {
        body: { name: 'Laço da mulher maravilha' },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'insert')
        .resolves({ type: null, message: newProduct });

      await productController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  })

  describe('Testes da função update', function () {
    it('Atualiza um produto corretamente e retorna o produto atualizado', async function () {
      const req = {
        body: { name: 'Laço da mulher maravilha' },
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'update')
        .resolves({ type: null, message: updatedProduct });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProduct);
    });

    it('Tenta atualizar produto que não existe e retorna erro', async function () {
      const req = {
        body: { name: 'Laço da mulher maravilha' },
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'update')
        .resolves({ type: 404, message: 'Product not found' });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  })

  describe('Testes da função delete', function () {
    it('Tenta deletar produto que não existe e retorna erro', async function () {
      const req = {
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'deleteProduct')
        .resolves({ type: 404, message: 'Product not found' });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});