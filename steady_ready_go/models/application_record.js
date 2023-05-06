import { Schema, model as Model, Error as MongooseError } from 'mongoose';
import RecordNotFound from '../errors/record_not_found.js';
import MissingAttribute from '../errors/missing_attribute.js';

export default class ApplicationRecord {
  static attributes = {};
  static model;
  static schema;
  static schema_options = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  };

  static _load_model() {
    this.schema = new Schema(this.attributes, this.schema_options)
    this.model = Model(this.name, this.schema);

    Object.keys(this.attributes).forEach(attr => {
      Object.defineProperty(this.prototype, attr, {
        get() {
          return this.document.get(attr);
        },
        set(value) {
          this.document.set(attr, value);
        }
      });
    });
  }

  static new(new_attributes = {}) {
    return new this(new this.model(new_attributes));
  }

  static async all() {
    let documents = [];
    try {
      for await (let doc of this.model.find({})) {
        documents.push(new this(doc));
      }
    } catch (err) { throw err }

    return documents;
  }

  static async find(id) {
    try {
      let document = await this.model.findById(id)

      if (document) {
        return new this(document);
      } else {
        throw new RecordNotFound(this.name);
      }
    } catch (err) { throw err }
  }

  constructor(document) {
    this.document = document;
    this.errors = {};
  }

  assign_attributes(new_attributes = {}) {
    Object.keys(new_attributes).forEach(attr => {
      if (this.constructor.attributes[attr]) { 
        this[attr] = new_attributes[attr];
      } else {
        throw new MissingAttribute(this.constructor.name, attr);
      }
    });
  }

  attributes() {
    return this.document.toObject({ versionKey: false })
  }

  async validate() {
    try {
      this.errors = {};
      await this.document.validate()
    } catch (err) {
      if (err instanceof MongooseError.ValidationError) {
        this.errors = this.document.errors;
        for (const [key, value] of Object.entries(this.document.errors)) {
          this.errors[key] = value.message;
        }
      } else throw err;
    }
  }

  async is_valid() {
    try {
      await this.validate();

      return Object.keys(this.errors).length === 0;
    } catch (err) { throw err }
  }

  async save() {
    try {
      let status = await this.is_valid();

      if (status) {
        await this.document.save()
      }

      return status;
    } catch (err) { throw err } 
  }

  async update(new_attributes) {
    try {
      let status = await this.is_valid();
      this.assign_attributes(new_attributes);

      if (status) {
        status = await this.save();
      }

      return status;
    } catch (err) { throw err }
  }

  async destroy() {
    try {
      await this.constructor.model.findByIdAndRemove(this.document._id);

      return true;
    } catch (err) { throw err }
  }
}