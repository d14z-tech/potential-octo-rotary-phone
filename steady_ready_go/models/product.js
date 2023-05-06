import ApplicationRecord from './application_record.js';
export default class Product extends ApplicationRecord {
  static attributes = {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0,
      required: true,
      min: 0
    },
    units: {
      type: Number,
      default: 0,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true
    }
  }

  static {
    this._load_model();
  }
}