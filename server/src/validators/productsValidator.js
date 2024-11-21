import Joi from 'joi';

export const productValidator = Joi.object({
  productName: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(1),
  image: Joi.string().required().min(3),
  description: Joi.string().max(500).optional(),
  quantity: Joi.number().required().min(1),
  category: Joi.string().required()
});
