'use strict'

const path = require('path')
const process = require('process')
const env = process.env.NODE_ENV || 'development'
const mongoose = require('mongoose')
const config = require(path.join(__dirname, '/../config/config.js'))[env]

mongoose.Promise = global.Promise
if (config.host && config.port) {
  mongoose.connect(`mongodb://${config.username && config.password ? `${config.username}:${config.password}@` : ''}${config.host}:${config.port}/${config.database || ''}`, { useNewUrlParser: true, useUnifiedTopology: true })
} else {
  mongoose.connect(`mongodb://localhost:27017/${config.database || ''}`, { useNewUrlParser: true, useUnifiedTopology: true })
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Connected successfully')
})

module.exports = {
  db,
  UserRoles: require('./userRoles'),
  User: require('./user'),
  Employees: require('./employees')
}
