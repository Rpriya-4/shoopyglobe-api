const express = require('express');
const {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
