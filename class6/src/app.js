const express = require("express");
const { errorHandler, notFoundHandler } = require("./middlewares/handlers");
const sequelize = require("./config/databases/postgresql");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use("/", require("./routes"));
app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.sync();
    
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();