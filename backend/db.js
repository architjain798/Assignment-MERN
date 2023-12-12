const mongoose = require("mongoose");

const mongoURI = "mongodb://0.0.0.0:27017/ecommerce?directConnection=true";

const connetToMongo = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("connected to mongodb successfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connetToMongo;
