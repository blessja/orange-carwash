const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
  washCar,
  getUserProfile,
  updateUserProfile,
  getUserWashHistory
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { updateWashHistory } = require('../controllers/washController');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/:id', getUserById);
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getUsers);
router.post('/:id/wash', protect, washCar, updateWashHistory);
// Public route to get user's wash history
router.get('/:id/wash-history', getUserWashHistory);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getMe,
//   getUsers,
//   getUserById,
//   washCar,
//   getUserProfile,
//   updateUserProfile
// } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');
// const { updateWashHistory } = require('../controllers/washController');

// router.get('/:id', getUserById);
// router.post('/', registerUser);
// router.post('/login', loginUser);
// router.get('/me', protect, getMe);
// router.get('/', getUsers);
// router.post('/:id/wash', washCar, protect, updateWashHistory);
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
// router.route('/me').get(protect, getMe);

// module.exports = router;
