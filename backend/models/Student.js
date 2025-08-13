const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    kelas: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
  },
  { timestamps : true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;