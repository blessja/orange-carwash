const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:id', getUserById)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/', getUsers)




module.exports = router
