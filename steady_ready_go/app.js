import Express from 'express';
import AsyncHandler from './async_handler.js';
import ProductsController from './controllers/products_controller.js';
import PageNotFound from './errors/page_not_found.js';

const App = Express();

App.use(Express.json());

// Logger
App.use(AsyncHandler(async (req, res, next) => {
  console.log(`Started ${req.method} "${req.path}" for ${req.ip} at ${new Date()}`);
  res.on('finish', async () => {
    console.log(`Completed ${res.statusCode} ${res.statusMessage}`);
  });
  next();
}));

// Root path
App.get('/', AsyncHandler( async (req, res) => {
  res.send('<h1>Steady, Ready, Go!</h1><p><b>Status:</b> online.</p>');
}));

// Products
App.use('/api/v1/products', ProductsController);

// Page not found handler
App.use(AsyncHandler(async (req, res, next) => {
  next(new PageNotFound());
}));

// Error handler
App.use((err, req, res, next) => {
  console.log('por aqui estoy entrando cuando hay un error');
  if (!(err instanceof PageNotFound)) console.log(err.stack);

  res.status(err.status || 500).json({ status: 'error', message: err.message });
});

export default App;

