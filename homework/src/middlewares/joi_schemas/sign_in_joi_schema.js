import Joi from "joi";

const schema = Joi.object({
  user: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(72).required()
  }).with('email', 'password').required()
})

export default async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch(err) {
    next(err);
  }
}