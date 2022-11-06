const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  contact: {
    type: String
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserRole'
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

UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  return next()
})
UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

UserSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compareSync(pwd, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
