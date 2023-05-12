const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.ELEPHANT_SQL_URL);
