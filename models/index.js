require("dotenv").config();
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

const db = {
  mongoose: mongoose,
  url: process.env.DB_URL,
  todos: require("./todos")(mongoose),
  users: require("./users")(mongoose),
};

module.exports = db;
