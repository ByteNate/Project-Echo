const Joi = require('joi');

// Validation schema for user registration
const userRegistrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('STUDENT', 'TA', 'ADMIN').required(),
});

// Validation schema for user login
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for class schedule
const classScheduleSchema = Joi.object({
  course: Joi.string().required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
  location: Joi.string().required(),
});

// Validation schema for pairing
const pairingSchema = Joi.object({
  classSchedule: Joi.string().hex().length(24).required(),
  ta: Joi.string().hex().length(24).required(),
  student: Joi.string().hex().length(24).required(),
});

// Validation schema for substitute
const substituteSchema = Joi.object({
  ta: Joi.string().hex().length(24).required(),
  date: Joi.date().iso().required(),
});

// Validation schema for updating user profile
const updateUserProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  profileImage: Joi.string(),
});

// Validation schema for updating user availability
const updateUserAvailabilitySchema = Joi.object({
  availability: Joi.array().items(
    Joi.object({
      day: Joi.string().required(),
      startTime: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).required(),
      endTime: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).required(),
    })
  ).required(),
});

// Validation schema for updating user preferences
const updateUserPreferencesSchema = Joi.object({
  preferences: Joi.object({
    maxWorkload: Joi.number().min(0),
    // Add other preference fields as needed
  }).required(),
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