const response = require('../services/Response')

exports.validate = (schema) => (req, res, next) => {
  const {
    error
  } = schema.validate(req.body)
  if (error) {
    response.errorResponseData(res, error.details[0].message, 422)
    // res.status(422)
    //   .send(error.details[0].message)
  } else {
    next()
  }
}
