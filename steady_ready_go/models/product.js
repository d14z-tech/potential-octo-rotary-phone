const fs = require('fs');

module.exports = class Product {
  static source = './db/products.txt'
  static records = [];

  static read() {
    let file_content = fs.readFileSync(this.source)
    this.records = file_content.length === 0 ? [] : JSON.parse(file_content);
    console.log(`Data fetched from ${this.source}`);
  }

  static write() {
    let stringified_records = JSON.stringify(this.records);
    fs.writeFileSync(this.source, stringified_records);
    console.log(`Data stored in ${this.source}`);
  }

  static all() {
    this.read();

    return this.records.map((record, index) => new this(record, index));
  }

  static find(id) {
    let record_index;
    this.read();

    let product = this.records.find((record, index) => {
      if (record.id === Number(id)) {
        record_index = index;
        return true 
      }
    });

    if (product) {
      return new this(product, record_index);
    } else {
      return null;
    }
  }

  static attributes = { 
    id: { default: null },
    name: { defaut: null },
    description: { default: null },
    price: { default: 0 },
    units: { default: 0 },
    category: { default: null }
  };

  constructor(new_attributes, record_index = null) {
    this.record_index = record_index;

    Object.entries(Product.attributes).forEach(([attr, options]) => {
      this[attr] = options.default
    });

    this.assign_attributes(new_attributes);
  }

  assign_attributes(new_attributes) {
    Object.keys(Product.attributes).forEach(attr => {
      if (new_attributes[attr]) this[attr] = new_attributes[attr]
    });
  }

  attributes() {
    let attrs = {}

    Object.keys(Product.attributes).forEach(attr => {
      attrs[attr] = this[attr];
    });

    return attrs;
  }

  save() {
    let last_element = Product.records[Product.records.length - 1];

    if (!this.record_index) {
      this.id = last_element ? last_element.id + 1 : 1
    }

    console.log(`Push ${Product.name}:`);
    console.table(this.attributes());

    Product.records.push(this.attributes());
    Product.write();

    return true;
  }

  update(new_attributes) {
    if (this.record_index === null || this.record_index === undefined) {
      throw new Error(`${Product.name} cannot be updated because it does not exist`);
    }

    delete new_attributes.id;
    this.assign_attributes(new_attributes);

    console.log(`Update ${Product.name}:`);
    console.table(this.attributes());

    Product.records[this.record_index] = this.attributes();
    Product.write();

    return true;
  }

  destroy() {
    if (this.record_index === null || this.record_index === undefined) {
      throw new Error(`${Product.name} cannot be destroyed because it does not exist`);
    }

    console.log(`Destroy ${Product.name}:`);
    console.log(this.attributes());

    Product.records.splice(this.record_index, 1);
    Product.write();

    return true
  }
}