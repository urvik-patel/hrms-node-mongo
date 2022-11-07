const Employees = require('../../../models/employees')
const EmployeeLeaves = require('../../../models/employeeLeaves')
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
      return response.successResponseData(res, data, 201, 'success')
    } catch (error) {
      console.log('error', error)
      return response.errorResponseData(res, error)
    }
  },

  listOfEmployees: async (req, res, next) => {
    try {
      const employeeData = await Employees.find()
      return response.successResponseData(res, employeeData, 200, 'success')
    } catch (error) {
      console.log('error', error)
      return response.errorResponseData(res, error)
    }
  },

  listOfLeaves: async (req, res, next) => {
    try {
      const { status, page = 1, limit = 10, sort = 'createdAt', order = 'DESC' } = req.headers
      var query = {}
      if (status) {
        query.leaveStatus = status.toLowerCase()
      }
      const countData = await EmployeeLeaves.countDocuments(query)
      if (!countData) {
        return response.successResponseWithoutData(res, 'No data found', 200)
      }
      const offset = 0 + (+limit * (+page - 1))
      const totalPages = Math.ceil(countData / limit)

      var sortObject = {}
      sortObject[sort] = order
      const data = await EmployeeLeaves.find(query).limit(limit).skip(offset).sort(sortObject)
      // const leaveList = Transformer.userList(data)
      return response.successResponseData(res, data, 200, 'success', { totalPages: totalPages, currentPage: page, recordsPerPage: limit })
    } catch (error) {
      console.log('error', error)
      return response.errorResponseData(res, error)
    }
  },

  leaveStatusUpdate: async (req, res, next) => {
    try {
      const { _id } = req.params
      req.body.leaveStatus = req.body.leaveStatus.toLowerCase()
      const leaveStatusOld = await EmployeeLeaves.findById(_id)

      if (req.body.leaveStatus === leaveStatusOld.leaveStatus) {
        return response.successResponseWithoutData(res, 'You can not update to the same status', 400)
      }

      const updatedData = await EmployeeLeaves.findByIdAndUpdate(_id, req.body, { useFindAndModify: false, new: true })
      return response.successResponseData(res, updatedData, 200, 'Leave status has been updated successfully!')
    } catch (error) {
      console.log('error', error)
      return response.errorResponseData(res, error)
    }
  }
}
