export default class PageNotFound extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PageNotFound);
    }

    this.name = "PageNotFound";
    this.message = "Page not found";
    this.status = 404;
  }
}