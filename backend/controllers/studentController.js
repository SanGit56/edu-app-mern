const Student = require("../models/Student.js");

const createStudent = async (req, res) => {
    try {
        const { nama, kelas } = req.body;
        if (!nama) {
            return res.status(400).json({ pesan: "Field nama harus diisi" });
        }

        const muridBaru = new Student({
            nama,
            kelas
        });

        await muridBaru.save();
        res.status(201).json({ pesan: "Murid telah ditambahkan", StudentId: muridBaru._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const readAllStudent = async (req, res) => {
    try {
        const semuaMurid = await Student.find();
        res.status(200).json(semuaMurid);
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

module.exports = { createStudent, readAllStudent };