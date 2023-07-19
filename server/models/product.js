const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    trim: true
  }
},{
  timestamps: true,
});

const Product = mongoose.model('ProductTable', productSchema);

module.exports = Product;