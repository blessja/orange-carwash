const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    car: {
      type: String,
      required: true
    },

    
    washHistory: [
      {
       
        date: {
          type: Date,
          default: Date.now
        },
        status: {
          type: String,
          enum: ['Pending', 'Completed'],
          default: 'Pending'
        }
      }
    ]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)