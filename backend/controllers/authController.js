const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { namapengguna, surel, katasandi } = req.body;
        if (!namapengguna || !surel || !katasandi) {
            return res.status(400).json({ pesan: "Semua field harus diisi" });
        }

        const penggunaAda = await User.findOne({ surel: surel });
        if (penggunaAda) {
            return res.status(400).json({ pesan: "Surel telah terdaftar" });
        }

        const penggunaBaru = new User({
            namapengguna,
            surel,
            katasandi // bcrypt
        });

        await penggunaBaru.save();
        res.status(201).json({ pesan: "Pengguna telah ditambahkan", userId: penggunaBaru._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { surel, katasandi } = req.body;
        if (!surel || !katasandi) {
            return res.status(400).json({ pesan: "Semua field harus diisi" });
        }

        const pengguna = await User.findOne({ surel: surel });
        if (!pengguna) {
            return res.status(400).json({ pesan: "Pengguna tidak terdaftar" });
        }

        const sandisesuai = pengguna.katasandi === katasandi; // bcrypt
        if (!sandisesuai) {
            return res.status(401).json({ pesan: "Kata sandi salah" });
        }

        const token = jwt.sign(
            { id: pengguna._id, surel: pengguna.surel },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ pesan: "Silakan masuk", token, userId: pengguna._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Server error" });
    }
};

module.exports = { register, login };