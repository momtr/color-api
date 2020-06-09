const Joi = require('joi');

const color = Joi.object({
    theme: Joi.string().min(1).max(100).required(),
    rgb: Joi.string().regex(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/).required(),
    hex: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).required(),
    type: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(0).max(1000).optional()
});

module.exports = { color }