const express = require('express');
const { saleController } = require('../controllers');
const { validateSaleFields } = require('../middlewares/validateSaleFields');

const router = express.Router();

router.use(validateSaleFields);

router.post('/', saleController.insert);

module.exports = router;