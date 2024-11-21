import Joi from 'joi';

export const customerRegisterValidator = Joi.object({
  name: Joi.string().required().min(3).max(255),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
});

export const customerLoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6)
});
