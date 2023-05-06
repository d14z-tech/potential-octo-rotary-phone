exports.errorHandler = (err, _, res, next) => {
  console.log(err);
  if (res.headersSent) {
      return next(err)
  }
  res.status(500)
  res.json({ error: err })
}

exports.notFoundHandler = (req, res, _) => {
  res.status(404).send(`Page ${req.path} does not exist in this cool server`);
}