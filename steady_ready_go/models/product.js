const ApplicationRecord = require('./application_record');
const joi = require('joi');

module.exports = class Product extends ApplicationRecord {
  static source = './db/products.txt';

  static attributes = {
    id: {
      default: null,
      schema: joi.number().required()
    },
    name: {
      defaut: null,
      schema: joi.string().required()
    },
    description: {
      default: null,
      schema: joi.string().required()
    },
    price: {
      default: 0,
      schema: joi.number().min(0)
    },
    units: {
      default: 0,
      schema: joi.number().integer().min(0)
    },
    category: {
      default: null,
      schema: joi.string().required()
    }
  }
}