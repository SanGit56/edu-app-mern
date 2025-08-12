const User = require("../models/User.js");

const viewRegister = (req, res) => {
    res.status(200).json({ pesan: "get register" });
};

const processRegister = async (req, res) => {
    res.status(201).json({ pesan: "post register" });

    try {
        const { namapengguna, surel, katasandi } = req.body;
        if (!namapengguna || !surel || !katasandi) {
            return res.status(400).json({ pesan: "Semua field harus diisi" });
        }

        const penggunaAda = await User.findOne({ surel });
        if (penggunaAda) {
            return res.status(400).json({ pesan: "Surel telah terdaftar" });
        }

        const penggunaBaru = new User({
            namapengguna,
            surel,
            katasandi
        });

        await penggunaBaru.save();
        res.status(201).json({ pesan: "Pengguna telah ditambahkan", userId: penggunaBaru._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const viewLogin = (req, res) => {
    res.status(200).json({ pesan: "get login" });
};

const processLogin = (req, res) => {
    res.status(201).json({ pesan: "post login" });
};

module.exports = { viewRegister, processRegister, viewLogin, processLogin };