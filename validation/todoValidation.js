const Joi = require("joi");

module.exports.createValidation = (data) => {
  const schema = Joi.object({
    todo: Joi.string().required().max(255),
    is_done: Joi.boolean().required(),
  });

  return schema.validate(data).error;
};

module.exports.updateValidation = (data) => {
  const schema = Joi.object({
    todo: Joi.string().max(255),
    is_done: Joi.boolean(),
  });

  return schema.validate(data).error;
};
