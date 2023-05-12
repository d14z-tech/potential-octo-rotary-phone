import { CastError, Error } from "mongoose";
import { EmptyResultError } from "sequelize";
import Joi from "joi";

export default (err, req, res, next) => {
  console.log(err.stack);

  if (err instanceof Joi.ValidationError) {
    res.status(400).json({ status: 'error', message: err.message });
  } else if (err instanceof CastError) {
    res.status(400).json({ status: 'error', message: err.message });
  } else if (err instanceof Error.DocumentNotFoundError) {
    res.status(404).json({ status: 'error', message: err.message });
  } else if (err instanceof EmptyResultError) {
    res.status(404).json({ status: 'error', message: "Record not found." });
  } else {
    res.status(500).json({ status: 'error', message: err.message });
  }
} 