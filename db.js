const mongoose = require("mongoose");

const conn = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "ship",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the DB successful");
    })
    .catch((err) => {
      console.log(`db error: ${err}`);
    });
};
module.exports = conn;
