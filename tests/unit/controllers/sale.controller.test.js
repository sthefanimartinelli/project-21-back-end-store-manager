const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { saleToInsert, resultInsertSale, wrongSaleToInsert } = require('./mocks/sale.controller.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});