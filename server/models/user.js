const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  }
},{
  timestamps: true,
});

const User = mongoose.model('UserTable', userSchema);

module.exports = User;