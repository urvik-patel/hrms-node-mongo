const mongoose = require('mongoose')

const EmployeeLeaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees'
  },
  leaveDateFrom: {
    type: Date,
    required: true
  },
  leaveDateTo: {
    type: Date,
    required: true
  },
  leaveStatus: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  noOfDays: {
    type: Number,
    required: true
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

EmployeeLeaveSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  return next()
})
EmployeeLeaveSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const EmployeeLeave = mongoose.model('EmployeeLeave', EmployeeLeaveSchema)

module.exports = EmployeeLeave
