const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  brand: { type: String },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String] },
});

module.exports = mongoose.model("Product", productSchema);
