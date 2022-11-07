const mongoose = require('mongoose')

const EmployeeAttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees'
  },
  dateOfDay: {
    type: Date,
    required: true
  },
  presentAbsent: {
    type: String,
    enum: ['p', 'a']
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

EmployeeAttendanceSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  return next()
})
EmployeeAttendanceSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const EmployeeAttendance = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema)

module.exports = EmployeeAttendance
