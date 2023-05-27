import JWT from "../lib/jwt.js";
import { User } from "../models/index.js";

export default async (req, res, next) => {
  try {
   const { user_id } = JWT.decode(req.get('Authorization'));
   const user = await User.findByPk(user_id);

   if (user === null) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
   } else {
    req.current_user = user;

    next();
   }
  } catch(err) {
    next(err);
  }
}