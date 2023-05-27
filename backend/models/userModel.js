// models/userModel.js

const mongoose = require('mongoose');

const washSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [false, 'Please add an email'],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    car: {
      type: String,
      required: true,
    },
    washHistory: [washSchema], // Add the wash history field
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);