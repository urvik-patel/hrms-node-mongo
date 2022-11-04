const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const EmployeesSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  middleName: {
    type: String
  },
  email: {
    type: String
  },
  contact: {
    type: String
  },
  password: {
    type: String
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

EmployeesSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compareSync(pwd, this.password)
}

EmployeesSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  return next()
})
EmployeesSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const Employees = mongoose.model('employees', EmployeesSchema)

module.exports = Employees
