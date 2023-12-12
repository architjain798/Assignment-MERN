const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const connetToMongo = () => {
  try {
    console.log("mongoURI", mongoURI);
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("connected to mongodb successfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connetToMongo;
