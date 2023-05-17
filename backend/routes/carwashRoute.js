const express = require('express')
const router = express.Router()

const { createCarwash, getCarwash } = require('../controllers/carwashController')

router.post('/', createCarwash)
router.get('/', getCarwash)

module.exports = router