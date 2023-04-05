const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET /products
router.get('/', (req, res) => {
  let products = Product.all();

  res.json({ status: 'success', data: products.map(product => product.attributes()) });
});

// GET /products/:id
router.get('/:id', (req, res) => {
  let product = Product.find(req.params.id);

  res.json({ status: 'success', data: product.attributes() });
});

// POST /products
router.post('/', (req, res) => {
  let product = new Product(req.body);

  if (product.save()) {
    res.status(201).json({ status: 'success', data: product.attributes() });
  } else {
    res.status(422).json({ status: 'fail', data: product.errors });
  }
});

// PUT /products/:id
router.put('/:id', (req, res) => {
  let product = Product.find(req.params.id);

  if (product.update(req.body)) {
    res.json({ status: 'success', data: product.attributes() });
  } else {
    res.status(422).json({ status: 'fail', data: product.errors });
  }
});

// DELETE /products/:id
router.delete('/:id', (req, res) => {
  let product = Product.find(req.params.id);

  product.destroy();

  res.json({ status: 'success', data: `${product.name} has been successfully destroyed` });
});

module.exports = router;