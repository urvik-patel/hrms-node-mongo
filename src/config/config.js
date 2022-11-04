'use strict'

const result = require('dotenv').config()

if (result.error) {
  throw result.error
}
module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    dialect: process.env.DB_CONNECTION,
    logging: false
  },
  staging: {
    username: process.env.DB_USER_STAGE,
    password: process.env.DB_PASSWORD_STAGE,
    database: process.env.DB_DATABASE_STAGE,
    host: process.env.DB_HOST_STAGE,
    port: process.env.DB_PORT_STAGE,
    dialect: process.env.DB_CONNECTION,
    logging: false
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: process.env.DB_CONNECTION,
    logging: false
  }
}
