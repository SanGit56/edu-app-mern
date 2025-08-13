const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    walikelas: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    murid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
  },
  { timestamps : true }
);

const Class = mongoose.model("Class", classSchema);
module.exports = Class;