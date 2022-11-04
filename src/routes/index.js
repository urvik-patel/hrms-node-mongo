'use strict'

const router = require('express').Router()
const adminRoute = require('./admin')
const apiRoute = require('./api')

// Admin routes
router.use('/admin', adminRoute)

// API routes
router.use('/api', apiRoute)

module.exports = router
