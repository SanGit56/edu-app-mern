const Class = require("../models/Class.js");

const createClass = async (req, res) => {
    try {
        const { nama, walikelas, murid } = req.body;
        if (!nama) {
            return res.status(400).json({ pesan: "Field nama harus diisi" });
        }

        const kelasBaru = new Class({
            nama,
            walikelas,
            murid
        });

        await kelasBaru.save();
        res.status(201).json({ pesan: "Kelas telah ditambahkan", classId: kelasBaru._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const readAllClass = async (req, res) => {
    try {
        const semuaKelas = await Class.find();
        res.status(200).json(semuaKelas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const readOneClass = async (req, res) => {
    try {
        const { id } = req.params;

        const kelas = await Class.findById(id);
        if (!kelas) {
            return res.status(404).json({ pesan: "Kelas tidak ditemukan" });
        }

        res.status(200).json(kelas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, walikelas, murid } = req.body;

        const kelasApdet = await Class.findByIdAndUpdate(
            id,
            { nama, walikelas, murid },
            { new: true }
        );

        if (!kelasApdet) {
            return res.status(404).json({ pesan: "Kelas tidak ditemukan" });
        }

        res.status(200).json(kelasApdet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Gagal menyunting" });
    }
};

const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;

        const kelasHapus = await Class.findByIdAndDelete(id);
        if (!kelasHapus) {
            return res.status(404).json({ pesan: "Kelas tidak ditemukan" });
        }

        res.status(200).json({ pesan: "Kelas terhapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

module.exports = { createClass, readAllClass, readOneClass, updateClass, deleteClass };