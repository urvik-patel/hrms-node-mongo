'use strict'

const router = require('express').Router()
const employee = require('../../controllers/api/v1/employee')
const jwtValidator = require('../../middleware/jwtValidate')
const { validate } = require('../../validation/index')
const employeeValidator = require('../../validation/employee')

// API Routes will be defined here
router.post('/employee/login', employee.signIn)

// GET Profile
router.get('/employee/:_id', jwtValidator.isSignedIn, employee.getProfile)

// Apply for a leave
router.post('/employee/applyForLeave', validate(employeeValidator.applyForLeave), jwtValidator.isSignedIn, employee.applyForLeave)

// My Leave List
router.get('/employee/myLeaves/:d', jwtValidator.isSignedIn, employee.myLeaveList)

// Make Attendance
router.post('/employee/attendance/:employeeId', jwtValidator.isSignedIn, employee.makeAttendance)

module.exports = router
