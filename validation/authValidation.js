const Joi = require("joi");

module.exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required().max(255),
  });

  return schema.validate(data).error;
};

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required().max(255),
  });

  return schema.validate(data).error;
};
