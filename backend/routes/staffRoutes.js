const express = require('express')
const router = express.Router()

const { registerStaff, loginStaff, getStaffData } = require('../controllers/staffController')

router.post('/', registerStaff)
router.post('/login', loginStaff)
router.get('/data', getStaffData)

module.exports = router