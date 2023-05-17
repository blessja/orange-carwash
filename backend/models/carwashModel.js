const mongoose = require('mongoose');

const carwashSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
      
    },
    email: {
      type: String,
      required: false
      
    },
    website: {
      type: String,
      required: false
      
    },
    openingHours: {
      type: String,
      required: false

    },  
    description: {
      type: String

    },
    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Carwash = mongoose.model('Carwash', carwashSchema);

module.exports = Carwash;
