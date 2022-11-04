const mongoose = require('mongoose')

const UserRoleSchema = new mongoose.Schema({
  role: {
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

UserRoleSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  return next()
})
UserRoleSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const UserRoles = mongoose.model('userRole', UserRoleSchema)

module.exports = UserRoles
