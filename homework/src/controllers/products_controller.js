import { Product } from "../models/index.js";

class ProductsController {
  async index(req, res, next) {
    try {
      const products = await Product.find({});

      res.json({ status: 'success', data: { products: products }});
    } catch(err) {
      next(err);
    }
  }

  async show(req, res, next) {
    try {
      const product = await Product.findById(req.params.id).orFail();

      res.json({ status: 'success', data: { product: product }});
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const product = await Product.create(req.body.product);

      res.status(201).json({ status: 'success', data: { product: product } });
    } catch(err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body.product, { new: true }).orFail();

      res.json({ status: 'success', data: { product: product } });
    } catch(err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id).orFail();

      res.json({ status: 'success', data: { message: `Product ${product.name} has been deleted.` }});
    } catch(err) {
      next(err);
    }
  }
}

export default new ProductsController();