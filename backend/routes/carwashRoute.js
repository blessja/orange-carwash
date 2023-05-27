const express = require('express')
const router = express.Router()

const { createCarwash, getCarwash, washUser } = require('../controllers/carwashController')

router.post('/', createCarwash)
router.get('/', getCarwash)
// POST /api/carwash/users/:userId/wash
router.post('/users/:userId/wash', washUser);

module.exports = router