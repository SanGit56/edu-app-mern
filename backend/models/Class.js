const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    walikelas: { type: String },
    murid: { type: mongoose.Schema.Types.ObjectId, ref: "Students" }
  },
  { timestamps : true }
);

const Class = mongoose.model("Class", classSchema);
module.exports = Class;