const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required : true
  },
  price: {
    type: Number,
    required: true
  },
  // image: {
  //   type: String
  // },
  // category: {
  //   type: String,
  //   trim: true
  // },
  // inStock: {
  //   type: Boolean,
  //   default: true
  // }

  stock: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
