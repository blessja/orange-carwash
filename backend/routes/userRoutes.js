
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
  washCar
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { updateWashHistory } = require('../controllers/washController');

router.get('/:id', getUserById);
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getUsers);
router.post('/:id/wash', washCar, protect, updateWashHistory);

module.exports = router;
