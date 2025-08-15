const express = require("express");
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

const { register, login } = require("../controllers/authController.js");

router.post("/register", register);
router.post("/login", login);
router.get('/verify', verifyToken, (req, res) => {
    res.json({ pesan: 'Token valid', user: req.user });
});

module.exports = router;