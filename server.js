require('module-alias/register')
require('dotenv').config()
require('@models')
const Express = require('express')
const Morgan = require('morgan')
const Path = require('path')
const cors = require('cors')
const RequestIp = require('request-ip')
const I18n = require('@root/src/i18n/i18n')

const app = Express()
const port = process.env.PORT || 3000

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', Path.join(__dirname, '/src/views'))
app.use(I18n)
app.use(
  Morgan(':method :url :status :res[content-length] - :response-time ms')
)
app.use(cors())
app.use(RequestIp.mw())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  next()
})

const { successResponseWithoutData } = require('@services/Response.js')
const { FAIL } = require('@services/Constant.js')

const IndexRoute = require('@root/src/routes')

app.use('/', IndexRoute)

app.use((err, req, res, next) => {
  if (err) {
    return successResponseWithoutData(res, err.message, FAIL)
  }
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
