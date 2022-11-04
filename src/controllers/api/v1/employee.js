const Employees = require('../../../models/employees')
const response = require('../../../services/Response')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const employeeData = await Employees.findOne({ email: req.body.email })
      if (!employeeData) {
        response.errorResponseData(res, 'Employee does not exist with this email id', 404)
      }
      if (!employeeData.comparePassword(req.body.password)) {
        response.errorResponseData(res, 'You are unauthorized!', 401)
      }
      const token = jwt.sign({ email: employeeData.email, firstName: employeeData.firstName, _id: employeeData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
      response.successResponseData(res, { _id: employeeData._id, email: employeeData.email, firstName: employeeData.firstName, token }, 200, 'Logged in successfully!')
    } catch (error) {
      console.error(error)
      response.errorResponseData(res, error)
    }
  }
}
