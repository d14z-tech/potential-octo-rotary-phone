import { User } from "../models/index.js";

class UsersController {
  async index(req, res, next) {
    try {
      const users = await User.findAll();

      res.json({ status: 'success', data: { users: users }});
    } catch(err) {
      next(err);
    }
  }

  async show(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id, { rejectOnEmpty: true });

      res.json({ status: 'success', data: { user: user }});
    } catch(err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const user = await User.create(req.body.user);

      res.status(201).json({ status: 'success', data: { user: user }});
    } catch(err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id, { rejectOnEmpty: true });
      await user.update(req.body.user);
      
      res.json({ status: 'success', data: { user: user }});
    } catch(err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id, { rejectOnEmpty: true });
      await user.destroy();

      res.json({ status: 'succes', data: { message: `User ${user.name} has been deleted.` }});
    } catch(err) {
      next(err);
    }
  }
}

export default new UsersController();
