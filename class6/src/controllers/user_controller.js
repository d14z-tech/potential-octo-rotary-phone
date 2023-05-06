const { User } = require("../models");

exports.index = async (req, res, next) => {
  try {
    console.log("User -> All");
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    next(error)
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log("User -> Create");
    const user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
}