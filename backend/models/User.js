const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    namapengguna: { type: String, required: true },
    surel: { type: String, required: true/*, unique: true*/ },
    katasandi: { type: String, required: true }
  },
  { timestamps : true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;