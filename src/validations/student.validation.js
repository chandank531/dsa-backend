const Joi = require('joi');

const registerStudentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginStudentSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerStudentSchema,
  loginStudentSchema
};
