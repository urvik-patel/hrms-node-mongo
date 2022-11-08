const Employees = require('../../../models/employees')
const EmployeeLeaves = require('../../../models/employeeLeaves')
const EmployeeAttendance = require('../../../models/employeeAttendance')
const response = require('../../../services/Response')
const mailMiddleware = require('../../../middleware/nodemailer')
const Transformer = require('../../../transformer/employee')

// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const employeeData = await Employees.findOne({ email: req.body.email }).populate('roleId')
      if (!employeeData) {
        return response.errorResponseData(res, res.__('Employee does not exist with this email id'), 404)
      }
      // validate password
      if (!employeeData.comparePassword(req.body.password)) {
        return response.errorResponseData(res, 'You are unauthorized!', 401)
      }

      // generate token
      const token = jwt.sign({ email: employeeData.email, firstName: employeeData.firstName, _id: employeeData._id, role: employeeData.roleId?.role }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
      employeeData.token = token

      // transform response
      const employeeSignIn = Transformer.employeeSignIn(employeeData)
      response.successResponseData(res, employeeSignIn, 200, 'Logged in successfully!')
    } catch (error) {
      console.error(error)
      return response.errorResponseData(res, error)
    }
  },

  getProfile: async (req, res, next) => {
    try {
      if (!req.params._id) {
        return response.errorResponseData(res, 'id not found in request', 400)
      }
      const employeeData = await Employees.findOne({ _id: req.params._id })
      return response.successResponseData(res, employeeData, 200, 'success')
    } catch (error) {
      console.error(error)
      return response.errorResponseData(res, error)
    }
  },

  applyForLeave: async (req, res, next) => {
    try {
      const leaveDataForEmployee = await EmployeeLeaves.find({ employeeId: req.body.employeeId })

      // get all single leaves of employee
      const allSingleLeaves = []
      if (leaveDataForEmployee && leaveDataForEmployee.length) {
        leaveDataForEmployee.map(data => {
          if (data.leaveDateFrom && data.leaveDateTo) {
            const fromDate = moment(data.leaveDateFrom)
            const toDate = moment(data.leaveDateTo)
            for (var d = fromDate; d.isSameOrBefore(toDate); d.add(1, 'days')) {
              if (!allSingleLeaves.includes(moment(fromDate).format('YYYY-MM-DD'))) {
                allSingleLeaves.push(moment(fromDate).format('YYYY-MM-DD'))
              }
            }
          }
          return data
        })
      }
      // console.log('allSingleLeaves', allSingleLeaves)

      // manage request leave days from
      const fromLeaveDate = moment(req.body.leaveDateFrom)
      const toLeaveDate = moment(req.body.leaveDateTo)
      const requestedLeavesArray = []
      for (var d = fromLeaveDate; d.isSameOrBefore(toLeaveDate); d.add(1, 'days')) {
        if (!requestedLeavesArray.includes(moment(fromLeaveDate).format('YYYY-MM-DD'))) {
          requestedLeavesArray.push(moment(fromLeaveDate).format('YYYY-MM-DD'))
        }
      }
      // console.log('request', requestedLeavesArray)

      let validationFlag = false
      if (allSingleLeaves && allSingleLeaves.length && requestedLeavesArray && requestedLeavesArray.length) {
        requestedLeavesArray.map(data => {
          if (allSingleLeaves.includes(data)) {
            validationFlag = true
          }
          return data
        })
      }
      // console.log('validation', validationFlag)
      if (validationFlag === true) {
        return response.errorResponseData(res, 'Leave already added', 409)
      }

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

      return response.successResponseData(res, data, 201, 'Leave has been applied successfully')
    } catch (error) {
      console.error(error)
      return response.errorResponseData(res, error)
    }
  },

  myLeaveList: async (req, res, next) => {
    try {
      if (!req.params.empId) {
        return response.errorResponseData(res, 'id not found in request', 400)
      }
      const data = await EmployeeLeaves.find({ employeeId: req.params.empId })
      return response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      console.error(error)
      return response.errorResponseData(res, error)
    }
  },

  makeAttendance: async (req, res, next) => {
    try {
      const { employeeId } = req.params
      const attendanceData = await EmployeeAttendance.find({ employeeId: employeeId, dateOfDay: { $gte: moment().format('YYYY-MM-DD 00:00:00'), $lte: moment().format('YYYY-MM-DD 23:59:59') } })
      if (attendanceData && attendanceData.length) {
        return response.errorResponseData(res, 'Attendance already filled', 400)
      }
      const addAttendance = new EmployeeAttendance({
        employeeId: employeeId,
        dateOfDay: Date.now(),
        presentAbsent: 'p'
      })
      const createdAttendance = await addAttendance.save(addAttendance)
      return response.successResponseData(res, createdAttendance, 200, 'Attendance has been created successfully')
    } catch (error) {
      console.error(error)
      return response.errorResponseData(res, error)
    }
  }
}
