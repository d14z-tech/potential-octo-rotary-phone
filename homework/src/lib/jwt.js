import jwt from "jsonwebtoken";

export default class JWT {
  static encode(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY_BASE, { expiresIn: process.env.JWT_EXP || '1m' });
  }

  static decode(token) {
    return jwt.verify(token, process.env.SECRET_KEY_BASE);
  }
}