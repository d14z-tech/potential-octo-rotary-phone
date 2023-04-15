const fs = require('fs');
const crypto = require('crypto');
const RecordNotFound = require('../errors/record_not_found');
const MissingAttribute = require('../errors/missing_attribute');

module.exports = class ApplicationRecord {
  static source;
  static records = [];
  static attributes = {};

  static read() {
    if (!fs.existsSync(this.source)) fs.appendFileSync(this.source, '[]');
    let file_content = fs.readFileSync(this.source);

    this.records = JSON.parse(file_content);
    console.log(`Fetched data from ${this.source}`);
  }

  static write() {
    let stringified_records = JSON.stringify(this.records);

    fs.writeFileSync(this.source, stringified_records);
    console.log(`Stored data in ${this.source}`);
  }

  static all() {
    this.read();

    return this.records.map((record, index) => new this(record, index));
  }

  static find(id) {
    let record;
    let record_index;
    this.read();

    record = this.records.find((object, index) => {
      if (object.id === id) {
        record_index = index;
        return true;
      }
    });

    if (record) {
      return new this(record, record_index);
    } else {
      throw new RecordNotFound(this.name);
    }
  }

  constructor(new_attributes = {}, record_index = null) {
    let attributes;
    let id;
    let created_at;
    let updated_at;

    ({ id = null, created_at = null, updated_at = null, ...attributes } = new_attributes);
    
    this.errors = {};
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.record_index = record_index;

    Object.entries(this.constructor.attributes).forEach(([attr, options]) => {
      this[attr] = options.default
    });

    this.assign_attributes(attributes);
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
    let attrs = { id: this.id };

    Object.keys(this.constructor.attributes).forEach(attr => {
      attrs[attr] = this[attr];
    });

    attrs.created_at = this.created_at;
    attrs.updated_at = this.updated_at;

    return attrs;
  }

  is_new_record() {
    return this.record_index === null || this.record_index === undefined;
  }

  is_valid() {
    this.errors = {};

    Object.entries(this.constructor.attributes).forEach(([attr, options]) => {
      let error = options.schema.strict().label(attr).validate(this[attr]).error;

      if (error) {
        this.errors[attr] = error.details.map(detail => detail.message);
      }
    });

    return Object.keys(this.errors).length === 0;
  }

  save() {
    let timestamp = (new Date()).toJSON();
    let status = this.is_valid();

    if (status) {
      if (this.is_new_record()) {
        this.id = crypto.randomUUID();
        this.created_at = timestamp;
        this.updated_at = timestamp;
        console.log(`Push ${this.constructor.name}:`);
        this.constructor.records.push(this.attributes());
        this.record_index = this.constructor.records.length - 1
      } else {
        console.log(`Update ${this.constructor.name}:`);
        this.updated_at = timestamp;
        this.constructor.records[this.record_index] = this.attributes();
      }
      
      console.table(this.attributes());
      this.constructor.write();
    }

    return status;
  }

  update(new_attributes) {
    if (this.is_new_record()) {
      throw new Error(`${this.constructor.name} cannot be updated because it does not exist`);
    }

    this.assign_attributes(new_attributes);

    return this.save();
  }

  destroy() {
    if (this.is_new_record()) {
      throw new Error(`${this.constructor.name} cannot be destroyed because it does not exist`);
    }

    console.log(`Destroy ${this.constructor.name}:`);
    console.table(this.attributes());

    this.constructor.records.splice(this.record_index, 1);
    this.constructor.write();

    return true;
  }
}