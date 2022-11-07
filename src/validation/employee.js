const Joi = require('joi')

exports.applyForLeave = Joi.object()
  .keys({
    employeeId: Joi.string()
      .required(),
    leaveDateFrom: Joi.string()
      .required(),
    leaveDateTo: Joi.string()
      .required(),
    leaveStatus: Joi.string()
      .required(),
    noOfDays: Joi.string()
      .required()
  })
