const Employees = require('../../../models/employees')
const EmployeeLeaves = require('../../../models/employeeLeaves')
const EmployeeAttendance = require('../../../models/employeeAttendance')
const response = require('../../../services/Response')
const mailMiddleware = require('../../../middleware/nodemailer')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const employeeData = await Employees.findOne({ email: req.body.email }).populate('roleId')
      if (!employeeData) {
        response.errorResponseData(res, 'Employee does not exist with this email id', 404)
      }
      if (!employeeData.comparePassword(req.body.password)) {
        response.errorResponseData(res, 'You are unauthorized!', 401)
      }
      const token = jwt.sign({ email: employeeData.email, firstName: employeeData.firstName, _id: employeeData._id, role: employeeData.roleId?.role }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
      response.successResponseData(res, { _id: employeeData._id, email: employeeData.email, firstName: employeeData.firstName, token }, 200, 'Logged in successfully!')
    } catch (error) {
      console.error(error)
      response.errorResponseData(res, error)
    }
  },

  getProfile: async (req, res, next) => {
    try {
      if (!req.params._id) {
        response.errorResponseData(res, 'id not found in request', 400)
      }
      const employeeData = await Employees.findOne({ _id: req.params._id })
      response.successResponseData(res, employeeData, 200, 'success')
    } catch (error) {
      console.error(error)
      response.errorResponseData(res, error)
    }
  },

  applyForLeave: async (req, res, next) => {
    try {
      const employeeLeaves = new EmployeeLeaves({
        employeeId: req.body.employeeId,
        leaveDateFrom: req.body.leaveDateFrom,
        leaveDateTo: req.body.leaveDateTo,
        leaveStatus: req.body.leaveStatus.toLowerCase(),
        noOfDays: req.body.noOfDays
      })
      const data = employeeLeaves.save()

      const employeeData = await Employees.findById({ _id: req.body.employeeId })
      const mailTo = employeeData?.email
      const mailSubject = `Leave Application from ${employeeData.firstName}`
      const mailHTML = `<h4>Hello</h4><br><h5>${employeeData.firstName} applied for leave from ${req.body.leaveDateFrom} to ${req.body.leaveDateTo}.</h5>`
      mailMiddleware.sendMailService(mailTo, mailSubject, mailHTML)

      response.successResponseData(res, data, 201, 'Leave has been applied successfully')
    } catch (error) {
      console.error(error)
      response.errorResponseData(res, error)
    }
  },

  myLeaveList: async (req, res, next) => {
    try {
      if (!req.params.empId) {
        response.errorResponseData(res, 'id not found in request', 400)
      }
      const data = await EmployeeLeaves.find({ employeeId: req.params.empId })
      response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      console.error(error)
      response.errorResponseData(res, error)
    }
  },

  makeAttendance: async (req, res, next) => {
    try {
      const { employeeId } = req.params
      const attendanceData = await EmployeeAttendance.find({ employeeId: employeeId, dateOfDay: { $gte: moment().format('YYYY-MM-DD 00:00:00'), $lte: moment().format('YYYY-MM-DD 23:59:59') } })
      if (attendanceData && attendanceData.length) {
        response.errorResponseData(res, 'Attendance already filled', 400)
      }
      const addAttendance = new EmployeeAttendance({
        employeeId: employeeId,
        dateOfDay: Date.now(),
        presentAbsent: 'p'
      })
      const createdAttendance = await addAttendance.save(addAttendance)
      response.successResponseData(res, createdAttendance, 200, 'Attendance has been created successfully')
    } catch (error) {
      console.error(error)
      response.errorResponseData(res, error)
    }
  }
}
