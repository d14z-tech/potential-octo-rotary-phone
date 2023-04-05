const fs = require('fs');
const RecordNotFound = require('../errors/record_not_found');
const MissingAttribute = require('../errors/missing_attribute');

module.exports = class ApplicationRecord {
  static source;
  static records = [];
  static attributes = {};

  static read() {
    let file_content = fs.readFileSync(this.source)

    this.records = file_content.length === 0 ? [] : JSON.parse(file_content);
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
      if (object.id === Number(id)) {
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
    this.errors = {};
    this.record_index = record_index;

    Object.entries(this.constructor.attributes).forEach(([attr, options]) => {
      this[attr] = options.default
    });

    this.assign_attributes(new_attributes);
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
    let attrs = {};

    Object.keys(this.constructor.attributes).forEach(attr => {
      attrs[attr] = this[attr];
    });

    return attrs;
  }

  is_new_record() {
    this.record_index === null || this.record_index === undefined;
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
    let status;
    let last_element = this.constructor.records[this.constructor.records.length - 1];

    if (!this.is_new_record()) {
      this.id = last_element ? last_element.id + 1 : 1
    }

    status = this.is_valid();

    if (status) {
      console.log(`Push ${this.constructor.name}:`);
      console.table(this.attributes());

      this.constructor.records.push(this.attributes());
      this.constructor.write();
    }

    return status;
  }

  update(new_attributes) {
    let status;

    if (this.is_new_record()) {
      throw new Error(`${this.constructor.name} cannot be updated because it does not exist`);
    }

    delete new_attributes.id;
    this.assign_attributes(new_attributes);

    status = this.is_valid();

    if (status) {
      console.log(`Update ${this.constructor.name}:`);
      console.table(this.attributes());

      this.constructor.records[this.record_index] = this.attributes();
      this.constructor.write();
    }

    return status;
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