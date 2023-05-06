export default class MissingAttribute extends Error {
  constructor(model_name, attribute_name, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingAttribute);
    }

    this.name = "MissingAttribute";
    this.model_name = model_name;
    this.attribute_name = attribute_name;
    this.message = `:${this.attribute_name} is no defined in ${this.model_name}`;
    this.status = 400;
  }
}