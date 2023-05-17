const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Staff  = require('../models/staffModel')

// @desc Register staff

// @route POST /api/staffs

// @access Public

const registerStaff = asyncHandler(async (req,res) => {
    const {name,email,password, carwash} = req.body

    if(!name || !email || !password || !carwash){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if staff exists
    const staffExists = await Staff.findOne({email})

    if(staffExists){
        res.status(400)
        throw new Error('Staff already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create staff
    const staff = await Staff.create({
        name,
        email,
        carwash,
        password: hashedPassword
    })

    if(staff){
        res.status(201).json({
            _id: staff.id,
            name: staff.name,
            email: staff.email,
            carwash: staff.carwash,
            token: generateToken(staff._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid staff data')
    }
}   

)

// @desc Authenticate staff

// @route POST /api/staffs/login    

// @access Public

const loginStaff = asyncHandler(async (req,res) => {
    const {email,password} = req.body

    // Check for staff email
    const staff = await Staff.findOne({email})

    if(staff && (await bcrypt.compare(password,staff.password))){
        res.json({
            _id: staff.id,
            name: staff.name,
            email: staff.email,
            token: generateToken(staff._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
}

)

// @desc Get staff data

// @route GET /api/staffs/me    

// @access Private

const getStaffData = asyncHandler(async (req,res) => {
    res.status(200).json(req.staff)
}   

)

// Generate JWT

const generateToken = (id) => { 
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = { 
    registerStaff,
    loginStaff,
    getStaffData
    
}

