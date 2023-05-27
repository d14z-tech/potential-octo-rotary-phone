import { User } from "../models/index.js";
import JWT from "../lib/jwt.js";

class AuthenticationController {
  async sign_up(req, res, next) {
    try {
      const user = await User.create(req.body.user);
      res.set('Token', JWT.encode({ user_id: user.id }));

      res.status(201).json({ status: 'success', data: { user: { name: user.name, email: user.email } } });
    } catch(err) {
      next(err);
    }
  }

  async sign_in(req, res, next) {
    try {
      const user = await User.findOne({ where: { email: req.body.user.email } });

      if (user === null || !user.authenticate(req.body.user.password)) {
        res.status(400).json({ status: 'error', message: 'Your email or password is incorrect.' });
      } else {
        res.set('Token', JWT.encode({ user_id: user.id }));

        res.json({ status: 'success', data: { user: { name: user.name, email: user.email } } });
      }
    } catch(err) {
      next(err);
    }
  }
}

export default new AuthenticationController();