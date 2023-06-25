const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {password, phone } = req.body

  if (!password || !phone ) {
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
    password: hashedPassword,
    phone,

  })

  if (user) {
    res.status(201).json({
      _id: user.id,
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
  const user = await User.findById(req.user._id); // Fetch the currently authenticated user using the req.user object

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
// const generateToken = (userId) => {
//   const secretKey = 'my_secret_key'; // Replace with your desired secret key
//   const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '30d' });
//   return token;
// };

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
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    // Update other profile details as needed

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


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


// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserWashHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Return the wash history
  res.status(200).json(user.washHistory);
});




module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
  washCar,
  updateUserProfile,
  getUserProfile,
  getUserWashHistory

}
