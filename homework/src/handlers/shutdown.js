import server from "../config/server.js";
import mongoose from "mongoose";
import sequelize from "../config/databases/postgresql.js";

export default async () => {
  try {
    console.log('Shutting down server...');
    server.close();
    console.log('Server closed.');

    console.log('Closing Mongo database connection...');
    await mongoose.disconnect();
    console.log('Closed Mongo database connection.');

    console.log('Closing Postgresql database connection...');
    await sequelize.close();
    console.log('Closed Postgresql database connection.');

    process.exit(0);
  } catch(err) {
    console.log(err.stack);

    process.exit(1);
  }
}