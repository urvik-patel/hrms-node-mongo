const jwt = require('jsonwebtoken')
const response = require('../services/Response')
exports.validateAPI = (req, res, next) => {
  if (!req.headers.token) {
    response.errorResponseData(res, 'Not getting token...', 401)
  }
  const verified = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY)
  if (verified && verified.role && verified.role == 'admin') {
    next()
  } else {
    response.errorResponseData(res, 'You are not authorized!', 401)
  }
}
