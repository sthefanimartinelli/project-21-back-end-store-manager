const express = require('express');
const { saleController } = require('../controllers');
const { validateSaleFields } = require('../middlewares/validateSaleFields');

const router = express.Router();

router.use(validateSaleFields);

router.post('/', saleController.insert);

router.get('/', saleController.findAll);

router.get('/:id', saleController.findById);

router.delete('/:id', saleController.deleteSale);

router.put('/:id', saleController.updateSale);

module.exports = router;