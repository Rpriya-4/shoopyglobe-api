const express = require('express');
const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require('../controllers/cartController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); 
// router.put('/:userId/:productId', updateCartItem);
// router.post('/add', addToCart);
// router.get('/:userId', getCartItems);
// router.delete('/:userId/:productId', removeFromCart);

// module.exports = router;

router.get('/', getCartItems);
router.post('/', addToCart);
router.put('/:itemId', updateCartItem);
router.delete('/:itemId', deleteCartItem);

module.exports = router;
