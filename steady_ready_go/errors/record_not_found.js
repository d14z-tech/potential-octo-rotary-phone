export default class RecordNotFound extends Error {
  constructor(model_name, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RecordNotFound);
    }

    this.name = "RecordNotFound";
    this.model_name = model_name;
    this.message = `${this.model_name} not found`;
    this.status = 404;
  }
}