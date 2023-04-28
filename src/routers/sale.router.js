const express = require('express');
const { saleController } = require('../controllers');
const { validateSaleFields } = require('../middlewares/validateSaleFields');

const router = express.Router();

router.use(validateSaleFields);

router.post('/', saleController.insert);

router.get('/', saleController.findAll);

router.get('/:id', saleController.findById);

module.exports = router;