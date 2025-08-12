const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamp : true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };