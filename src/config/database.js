'use strict'

const process = require('process')
const env = process.env.NODE_ENV || 'development'
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

if (env === 'development') {
  mongoose.connect(process.env.DB_URL_DEV, { useNewUrlParser: true, useUnifiedTopology: true })
}
if (env === 'staging') {
  mongoose.connect(process.env.DB_URL_STAG, { useNewUrlParser: true, useUnifiedTopology: true })
}
if (env === 'production') {
  mongoose.connect(process.env.DB_URL_PROD, { useNewUrlParser: true, useUnifiedTopology: true })
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Database connected successfully!')
})

module.exports = db
