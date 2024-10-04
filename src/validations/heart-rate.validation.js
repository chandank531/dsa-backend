const Joi = require('joi');

const heartRateSchema = Joi.object({
  clinical_data: Joi.object({
    HEART_RATE: Joi.object({
      data: Joi.array().items(
        Joi.object({
          measurement: Joi.number().required(),
          on_date: Joi.date().iso().required(),
        })
      ).required(),
    }).required(),
    WEIGHT: Joi.object({
      measurement: Joi.number().optional(),
      unit: Joi.string().optional(),
    }).optional(),
    BLOOD_GLUCOSE_LEVELS: Joi.object({
      measurement: Joi.number().optional(),
      unit: Joi.string().optional(),
    }).optional(),
    HEIGHT: Joi.object({
      measurement: Joi.number().optional(),
      unit: Joi.string().optional(),
    }).optional(),
    BP: Joi.object({
      systolic: Joi.number().optional(),
      diastolic: Joi.number().optional(),
    }).optional(),
    STEPS: Joi.object({
      count: Joi.number().optional(),
    }).optional(),
  }).required(),
  
  patient_id: Joi.string().required(),
  orgId: Joi.string().required(),
  timestamp: Joi.date().iso().required(),
});

const validateHeartRateData = (req, res, next) => {
  const { error } = heartRateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(detail => detail.message),
    });
  }

  next();
};

module.exports = {
  validateHeartRateData
};
