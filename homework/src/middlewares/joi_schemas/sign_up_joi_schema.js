import Joi from "joi";

const schema = Joi.object({
  user: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(72).required(),
    password_confirmation: Joi.ref('password')
  }).with('password', 'password_confirmation').required()
})

export default async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch(err) {
    next(err);
  }
}