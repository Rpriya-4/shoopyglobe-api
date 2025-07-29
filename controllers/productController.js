// const Product = require('../models/Product');

// // @desc    Get all products
// // @route   GET /api/products
// // @access  Public
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // @desc    Get product by ID
// // @route   GET /api/products/:id
// // @access  Public
// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // @desc    Add a new product
// // @route   POST /api/products
// // @access  Public (for now)
// const addProduct = async (req, res) => {
//   const { name, price, image, description } = req.body;
//   try {
//     const newProduct = new Product({ name, price, image, description });
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid Product Data' });
//   }
// };

// // @desc    Delete a product
// // @route   DELETE /api/products/:id
// // @access  Public (for now)
// const deleteProduct = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Product not found' });
//     res.json({ message: 'Product deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   addProduct,
//   deleteProduct,
// };





const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error); // error middleware handle karega
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new product
// @route   POST /api/products
// @access  Private (admin only - if you apply auth later)
const addProduct = async (req, res, next) => {
  const { name, price, stock ,  description } = req.body;
   
  
  if (!name || !price  || !stock || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProduct = new Product({ name, price, stock ,description });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (admin only - if you apply auth later)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }


    await product.deleteOne();

    //  cart.items.pull(itemId);
    // await cart.save();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
};

