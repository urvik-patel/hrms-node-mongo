'use strict'

const router = require('express').Router()
const user = require('../../controllers/v1/users')
const employee = require('../../controllers/v1/employee')
const { validate } = require('../../validation/index')
const userValidator = require('../../validation/user')
const jwtValidator = require('../../middleware/adminValidation')

// Admin Routes will be define here
router.get('/user', jwtValidator.validateAPI, user.findAll)
router.get('/user/:id', jwtValidator.validateAPI, user.getOneUser)
router.post('/user', validate(userValidator.addUser), jwtValidator.validateAPI, user.createUser)
router.put('/user/:id', validate(userValidator.updateUser), jwtValidator.validateAPI, user.updateUser)
router.delete('/user/:id', jwtValidator.validateAPI, user.deleteUser)
router.post('/user/login', user.signIn)

router.post('/employee', jwtValidator.validateAPI, employee.createEmployee)
module.exports = router
