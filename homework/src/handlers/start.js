import server from "../config/server.js";
import mongoose from "mongoose";
import sequelize from "../config/databases/postgresql.js";

const port = process.env.PORT || 3000;

export default async () => {
  try {
    console.log("Establishing connection to Mongo database...");
    mongoose.set('debug', true);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Established connection to Mongo database.");

    console.log("Synchronizing Postgresql database...");
    await sequelize.sync();
    console.log("Synchronized Postgresql database.");

    server.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}.`);
    });
  } catch(err) {
    console.log(err.stack);
    
    process.exit(1);
  }
}