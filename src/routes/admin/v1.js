'use strict'

const router = require('express').Router()
const user = require('../../controllers/admin/v1/users')
const employee = require('../../controllers/admin/v1/employee')
const { validate } = require('../../validation/index')
const userValidator = require('../../validation/user')
const adminValidator = require('../../middleware/adminValidation')

// Admin Routes will be define here
// GET User List
router.get('/user', adminValidator.validateAPI, user.findAll)
// GET one User
router.get('/user/:id', adminValidator.validateAPI, user.getOneUser)
// ADD new User
router.post('/user', validate(userValidator.addUser), adminValidator.validateAPI, user.createUser)
// UPDATE User Details - Admin
router.put('/user/:id', validate(userValidator.updateUser), adminValidator.validateAPI, user.updateUser)
// DELETE User
router.delete('/user/:id', adminValidator.validateAPI, user.deleteUser)
// Admin Login
router.post('/user/login', validate(userValidator.login), user.signIn)
// ADD User Role
router.post('/userrole', validate(userValidator.addUserRole), adminValidator.validateAPI, user.createRole)
// GET Role List
router.get('/userrole', adminValidator.validateAPI, user.roleList)

// ADD new Employee
router.post('/employee', validate(userValidator.addEmployee), adminValidator.validateAPI, employee.createEmployee)
// GET Employee List
router.get('/employee', adminValidator.validateAPI, employee.listOfEmployees)
// Employee Leave List
router.get('/employee/leaveList', adminValidator.validateAPI, employee.listOfLeaves)
// Employee Leave Approve/Reject
router.put('/employee/updateLeaveStatus/:_id', adminValidator.validateAPI, validate(userValidator.leaveStatusUpdate), employee.leaveStatusUpdate)

module.exports = router
