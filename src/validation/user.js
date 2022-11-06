const { string } = require('joi')
const Joi = require('joi')

exports.addUser = Joi.object()
  .keys({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .required().email(),
    password: Joi.string()
      .required(),
    contact: Joi.string()
      .required(),
    roleId: Joi.string()
      .required()
  })

exports.updateUser = Joi.object()
  .keys({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .required().email(),
    password: Joi.string()
      .required(),
    contact: Joi.string()
      .required(),
    roleId: Joi.object()
      .required()
  })

  exports.addUserRole = Joi.object()
  .keys({
    role: Joi.string()
      .required()
  })

  exports.login = Joi.object()
  .keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
  })

  exports.addEmployee = Joi.object()
  .keys({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    middleName: Joi.string(),
    email: Joi.string()
      .required()
      .email(),
    contact: Joi.string()
      .required(),
    password: Joi.string(),
    roleId: Joi.string()
      .required()
  })
