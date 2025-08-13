const User = require("../models/User.js");

const readAllUser = async (req, res) => {
    try {
        const semuaPengguna = await User.find();
        res.status(200).json(semuaPengguna);
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { namapengguna, surel, katasandi } = req.body;

        const penggunaApdet = await User.findByIdAndUpdate(
            id,
            { namapengguna, surel, katasandi },
            { new: true }
        );

        if (!penggunaApdet) {
            return res.status(404).json({ pesan: "Pengguna tidak ditemukan" });
        }

        res.status(200).json(penggunaApdet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const penggunaHapus = await User.findByIdAndDelete(id);
        if (!penggunaHapus) {
            return res.status(404).json({ pesan: "Pengguna tidak ditemukan" });
        }

        res.status(200).json({ pesan: "Pengguna terhapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

module.exports = { readAllUser, updateUser, deleteUser };