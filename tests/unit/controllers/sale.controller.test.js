const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { saleToInsert, resultInsertSale, wrongSaleToInsert, allSales, oneSale } = require('./mocks/sale.controller.mock');

describe('Testes de controller de sales', function () {

  describe('Testes da função insert', function () {
    it('Insere uma sale corretamente e retorna o status correto e a nova sale', async function () {
      const req = {
        body: saleToInsert,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'insert')
        .resolves({ type: null, message: resultInsertSale });

      await saleController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(resultInsertSale);
    });

    it('Tenta inserir uma sale com erro, retorna o status correto e o erro', async function () {
      const req = {
        body: wrongSaleToInsert,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'insert')
        .resolves({ type: 422, message: '"quantity" must be greater than or equal to 1' });

      await saleController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  })

  describe('Testes da função findAll', function () {
    it('Deve retornar status 200 e a lista de sales', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findAll')
        .resolves({ type: null, message: allSales });
      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  })
  describe('Testes da função findById', function () {
    it('Deve responder com status 200 e a sale referente ao id pesquisado', async function () {
      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: null, message: oneSale });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(oneSale);
    });

    it('Retorna erro ao passar um id que não existe', async function () {
      const req = {
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: 404, message: 'Sale not found' });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});