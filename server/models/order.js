const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    trim: true
  },
  product_id: {
    type: String,
    required: true,
    trim: true
  },
  product_name: {
    type: String,
    required: true,
    trim: true
  },
  product_image: {
    type: String,
    required: true,
    trim: true
  },
  order_address: {
    type: String,
    required: true,
    trim: true
  },
  order_price: {
    type: Number,
    required: true,
    trim: true
  },
  order_completed: {
    type: Boolean,
    required: true
  }
},{
  timestamps: true,
});

const Order = mongoose.model('orderTable', orderSchema);

module.exports = Order;