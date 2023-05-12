import Joi from "joi";

const schema = Joi.object({
  product: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    units: Joi.number().integer().required().min(0),
    category: Joi.string().required()
  }).required().min(1)
})

export default async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch(err) {
    next(err);
  }
}