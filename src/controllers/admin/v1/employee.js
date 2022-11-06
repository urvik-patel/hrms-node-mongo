const Employees = require('../../../models/employees')
const response = require('../../../services/Response')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

module.exports = {
  createEmployee: async (req, res, next) => {
    try {
      const employeeData = new Employees({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        contact: req.body.contact,
        password: bcrypt.hashSync(req.body.password, 10),
        roleId: req.body.roleId
      })

      const data = await employeeData.save(employeeData)
      response.successResponseData(res, data, 201, 'success')
    } catch (error) {
      console.log('error', error)
      response.errorResponseData(res, error)
    }
  },

  listOfEmployees: async (req, res, next) => {
    try {
      const employeeData = await Employees.find()
      response.successResponseData(res, employeeData, 200, 'success')
    } catch (error) {
      console.log('error', error)
      response.errorResponseData(res, error)
    }
  }
}
