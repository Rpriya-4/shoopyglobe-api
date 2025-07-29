// // const Cart = require('../models/Cart');

// // // @desc    Get all cart items
// // // @route   GET /api/cart
// // // @access  Public
// // const getCartItems = async (req, res) => {
// //   try {
// //     const cartItems = await Cart.find();
// //     res.status(200).json(cartItems);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to fetch cart items' });
// //   }
// // };

// // // @desc    Add item to cart
// // // @route   POST /api/cart
// // // @access  Public
// // const addToCart = async (req, res) => {
// //   const { productId, name, price, quantity } = req.body;

// //   try {
// //     const newItem = new Cart({ productId, name, price, quantity });
// //     await newItem.save();
// //     res.status(201).json(newItem);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to add to cart' });
// //   }
// // };

// // // @desc    Delete cart item by ID
// // // @route   DELETE /api/cart/:id
// // // @access  Public
// // const deleteCartItem = async (req, res) => {
// //   try {
// //     await Cart.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: 'Cart item deleted' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to delete cart item' });
// //   }
// // };

// // module.exports = {
// //   getCartItems,
// //   addToCart,
// //   deleteCartItem
// // };


// const Cart = require('../models/Cart');
// const Product = require('../models/Product');

// // @desc    Get all cart items
// // @route   GET /api/cart
// // @access  Public
// const getCartItems = async (req, res, next) => {
//   try {
//     const cartItems = await Cart.find();
//     res.status(200).json(cartItems);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Add item to cart
// // @route   POST /api/cart
// // @access  Public
// const addToCart = async (req, res, next) => {
//   const { productId, quantity } = req.body;

//   if (!productId || !quantity || quantity <= 0) {
//     return res.status(400).json({ message: 'Invalid product or quantity' });
//   }

//   try {
//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const newItem = new Cart({
//       productId,
//       name: product.name,
//       price: product.price,
//       quantity
//     });

//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Delete cart item by ID
// // @route   DELETE /api/cart/:id
// // @access  Public
// const deleteCartItem = async (req, res, next) => {
//   try {
//     const item = await Cart.findByIdAndDelete(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     res.status(200).json({ message: 'Cart item deleted' });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getCartItems,
//   addToCart,
//   deleteCartItem
// };





const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get cart items for logged-in user
// @route   GET /api/cart
// @access  Private
const getCartItems = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      return res.status(200).json({ items: [] }); // Empty cart
    }
    res.status(200).json(cart.items);
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart (or update quantity if exists)
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product or quantity' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart if none exists
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(201).json(cart.items);
  } catch (error) {
    next(error);
  }
};

// @desc    Update quantity of cart item
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res, next) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than 0' });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart.items);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete cart item by ID
// @route   DELETE /api/cart/:itemId
// @access  Private
const deleteCartItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
 item.remove();
    await cart.save();

    res.status(200).json({ message: 'Cart item deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
};