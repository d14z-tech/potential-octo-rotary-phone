import Express from 'express';
import Product from '../models/product.js';
import AsyncHandler from '../async_handler.js';

const Router = Express.Router();

// GET /products
Router.get('/', AsyncHandler(async (req, res) => {
  let products = await Product.all();

  res.json({ status: 'success', data: products.map(product => product.attributes()) });
}));

// GET /products/:id
Router.get('/:id', AsyncHandler(async (req, res) => {
  let product = await Product.find(req.params.id);

  res.json({ status: 'success', data: product.attributes() });
}));

// POST /products
Router.post('/', AsyncHandler( async (req, res) => {
  let product = Product.new(req.body);

  if (await product.save()) {
    res.status(201).json({ status: 'success', data: product.attributes() });
  } else {
    res.status(422).json({ status: 'fail', data: product.errors });
  }
}));

// PATCH /products/:id
Router.patch('/:id', AsyncHandler( async (req, res) => {
  let product = await Product.find(req.params.id);

  if (await product.update(req.body)) {
    res.json({ status: 'success', data: product.attributes() });
  } else {
    res.status(422).json({ status: 'fail', data: product.errors });
  }
}));

// DELETE /products/:id
Router.delete('/:id', AsyncHandler(async (req, res) => {
  let product = await Product.find(req.params.id);
  await product.destroy();

  res.status(204).send();
}));

export default Router;