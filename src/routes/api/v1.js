'use strict'

const router = require('express').Router()
const employee = require('../../controllers/api/v1/employee')
// const jwtValidator = require('../../middleware/employeeValidation')

// API Routes will be defined here
router.post('/employee/login', employee.signIn)

module.exports = router
