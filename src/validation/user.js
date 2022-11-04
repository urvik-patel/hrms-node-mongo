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
