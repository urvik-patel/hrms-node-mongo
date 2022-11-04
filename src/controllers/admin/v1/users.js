const User = require('../../../models/user')
const response = require('../../../services/Response')
// const mongoose = require('mongoose')
const Transformer = require('../../../transformer/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, search, gender, sort = '_id', order = 'DESC' } = req.headers
      // await User.createIndex({ title: 'firstName'})
      var query = {}
      if (search) {
        query.firstName = `/.*${search}+.*/i`
      }
      if (gender) {
        query.gender = `/${gender}/i`
      }
      const countData = await User.countDocuments(query)
      if (!countData) {
        response.successResponseWithoutData(res, 'No data found', 200)
      }
      const offset = 0 + (+limit * (+page - 1))
      const totalPages = Math.ceil(countData / limit)

      var sortObject = {}
      sortObject[sort] = order
      const data = await User.find(query).limit(limit).skip(offset).sort(sortObject)
      const userList = Transformer.userList(data)
      response.successResponseData(res, userList, 200, 'success', { totalPages: totalPages, currentPage: page, recordsPerPage: limit })
    } catch (error) {
      console.log(error)
      response.errorResponseData(res, error)
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
      response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      response.errorResponseData(res, error)
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
      response.successResponseData(res, data, 201, 'success')
    } catch (error) {
      console.log('error', error)
      response.errorResponseData(res, error)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      console.log(error)
      response.errorResponseData(res, error)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        response.errorResponseData(res, null, 400, 'Some of the required fields are missing.')
      }
      const data = await User.findByIdAndRemove(id, { useFindAndModify: false })
      response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      response.errorResponseData(res, error)
    }
  },

  signIn: async (req, res, next) => {
    try {
      const userData = await User.findOne({ email: req.body.email })
      if (!userData) {
        response.errorResponseData(res, 'User does not exist with this email id', 404)
      }
      if (!userData.comparePassword(req.body.password)) {
        response.errorResponseData(res, 'You are unauthorized!', 401)
      }
      const token = jwt.sign({ email: userData.email, name: userData.name, _id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
      response.successResponseData(res, { _id: userData._id, email: userData.email, name: userData.name, token }, 200, 'Logged in successfully!')
    } catch (error) {
      console.error(error)
      response.errorResponseData(res, error)
    }
  }
}
