const User = require('../../../models/user')
const UserRoles = require('../../../models/userRoles')
const response = require('../../../services/Response')
// const mongoose = require('mongoose')
const Transformer = require('../../../transformer/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, search, sort = '_id', order = 'DESC' } = req.headers
      // await User.createIndex({ title: 'firstName'})
      var query = {}
      if (search) {
        query.firstName = `/.*${search}+.*/i`
      }
      const countData = await User.countDocuments(query)
      if (!countData) {
        return response.successResponseWithoutData(res, 'No data found', 200)
      }
      const offset = 0 + (+limit * (+page - 1))
      const totalPages = Math.ceil(countData / limit)

      var sortObject = {}
      sortObject[sort] = order
      const data = await User.find(query).limit(limit).skip(offset).sort(sortObject)
      const userList = Transformer.userList(data)
      return response.successResponseData(res, userList, 200, 'success', { totalPages: totalPages, currentPage: page, recordsPerPage: limit })
    } catch (error) {
      console.log(error)
      return response.errorResponseData(res, error)
    }
  },

  getOneUser: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.send({
          code: 400,
          message: 'Some of the required fields are missing.'
        })
      }
      const data = await User.findById(id)
      return response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      return response.errorResponseData(res, error)
    }
  },

  createUser: async (req, res, next) => {
    try {
      const userData = new User({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: bcrypt.hashSync(req.body.password, 10),
        roleId: req.body.roleId
      })

      const data = await userData.save(userData)
      return response.successResponseData(res, data, 201, 'success')
    } catch (error) {
      console.log('error', error)
      return response.errorResponseData(res, error)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      return response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      console.log(error)
      return response.errorResponseData(res, error)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        return response.errorResponseData(res, null, 400, 'Some of the required fields are missing.')
      }
      const data = await User.findByIdAndRemove(id, { useFindAndModify: false })
      return response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      return response.errorResponseData(res, error)
    }
  },

  signIn: async (req, res, next) => {
    try {
      const userData = await User.findOne({ email: req.body.email }).populate('roleId')
      if (!userData) {
        return response.errorResponseData(res, 'User does not exist with this email id', 404)
      }
      if (!userData.comparePassword(req.body.password)) {
        return response.errorResponseData(res, 'You are unauthorized!', 401)
      }
      const token = jwt.sign({ email: userData.email, name: userData.name, _id: userData._id, role: userData.roleId?.role }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
      return response.successResponseData(res, { _id: userData._id, email: userData.email, name: userData.name, token }, 200, 'Logged in successfully!')
    } catch (error) {
      console.error(error)
      return response.errorResponseData(res, error)
    }
  },

  createRole: async (req, res, next) => {
    try {
      const userRoleData = new UserRoles({
        role: req.body.role
      })

      const data = await userRoleData.save(userRoleData)
      return response.successResponseData(res, data, 201, 'User role has been created successfully')
    } catch (error) {
      console.log('error', error)
      return response.errorResponseData(res, error)
    }
  },

  roleList: async (req, res, next) => {
    try {
      const data = await UserRoles.find()
      return response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      console.log('error', error)
      return response.errorResponseData(res, error)
    }
  }
}
