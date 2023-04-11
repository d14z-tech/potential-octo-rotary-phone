const express = require('express');
const PageNotFound = require('./errors/page_not_found');
const ProductsController = require('./controllers/products_controller');

const app = express();
const port = 3000;

app.use(express.json());

// Logger
app.use(function(req, res, next) {
  console.log(`Started ${req.method} "${req.path}" for ${req.ip} at ${new Date()}`);
  res.on('finish', () => {
    console.log(`Completed ${res.statusCode} ${res.statusMessage}`);
  });
  next();
});

// Root path
app.get('/', (req, res) => {
  res.send('<h1>Steady, Ready, Go!</h1><p><b>Status:</b> online.</p>');
});

// Products
app.use('/api/v1/products', ProductsController);

// Page not found handler
app.use(function(req, res, next) {
  next(new PageNotFound());
});

// Error handler
app.use(function(err, req, res, next) {
  if (!(err instanceof PageNotFound)) console.log(err.stack);

  res.status(err.status || 500).json({ status: 'error', message: err.message });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Steady, Ready, Go! listening on port ${port}.`);
});