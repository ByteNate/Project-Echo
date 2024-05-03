const Joi = require('joi');

// Validation schema for user registration
const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'TA', 'admin').required(),
});

// Validation schema for user login
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for class schedule
const classScheduleSchema = Joi.object({
  course: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  location: Joi.string().required(),
});

// Validation schema for pairing
const pairingSchema = Joi.object({
  classSchedule: Joi.string().required(),
  ta: Joi.string().required(),
  student: Joi.string().required(),
});

// Validation schema for substitute
const substituteSchema = Joi.object({
  ta: Joi.string().required(),
  date: Joi.date().required(),
});

// Middleware for validating request body
exports.validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Middleware for validating request parameters
exports.validateParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};