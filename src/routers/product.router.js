const express = require('express');
const { productController } = require('../controllers');
const validateProductFields = require('../middlewares/validateProductFields');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/:id', productController.findById);

router.post('/', validateProductFields, productController.insert);

router.put('/:id', validateProductFields, productController.update);

module.exports = router;