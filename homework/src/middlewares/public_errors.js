const catch_responses = {
  "ValidationError": 400,
  "CastError": 400,
  "DocumentNotFoundError": 404,
  "EmptyResultError": 404,
  "TokenExpiredError": 400,
  "JsonWebTokenError": 400,
}

export default (err, req, res, next) => {
  console.log(err.stack);
  const code = catch_responses[err.name];

  if (code) {
    res.status(code).json({ status: 'error', message: err.message });
  } else {
    res.status(500).json({ status: 'error', message: err.message });
  }
} 