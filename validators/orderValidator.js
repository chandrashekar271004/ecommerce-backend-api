const Joi = require("joi");

const orderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "paid", "shipped", "delivered", "cancelled")
    .required()
});

module.exports = orderStatusSchema;