const express = require('express');
const { productController } = require('../controllers');
const validateProductFields = require('../middlewares/validateProductFields');

const router = express.Router();

router.use(validateProductFields);

router.get('/', productController.findAll);

router.get('/:id', productController.findById);

router.post('/', productController.insert);

module.exports = router;