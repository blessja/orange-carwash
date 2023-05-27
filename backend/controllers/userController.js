const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, password, car, phone } = req.body

  if (!name || !password || !car || !phone ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ phone })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    password: hashedPassword,
    car,
    phone,

  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      car: user.car,
      phone: user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body

  // Check for user phone
  const user = await User.findOne({ phone })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      phone: user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Get users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

// @desc Get user by id
// @desc Get /api/users/:id
// @access Private

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(req.params.id)
  console.log(user)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


const washCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update the wash history
  user.washHistory.push({
    date: new Date(),
    status: 'Completed',
  });

  // Save the updated user
  await user.save();

  res.status(200).json(user);
});



module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
  washCar
}