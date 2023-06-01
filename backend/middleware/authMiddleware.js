const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')

// Generate JWT
const generateToken = (id) => {
  const secret = 'my_secret_key'; // Replace with your desired secret key
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from the authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, 'my_secret_key'); // Replace with your secret key

      // Assign the decoded payload to the request object
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect, generateToken };
