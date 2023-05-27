import { Sequelize } from "sequelize";

export default new Sequelize(process.env.ELEPHANT_SQL_URL);