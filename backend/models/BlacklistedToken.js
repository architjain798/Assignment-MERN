const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blacklistedTokenSchema = new Schema({
  token: { type: String, required: true },
});

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
