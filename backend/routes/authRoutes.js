const express = require("express");
const router = express.Router();

const { viewRegister, processRegister, viewLogin, processLogin } = require("../controllers/authController.js");

router.get("/register", viewRegister);
router.post("/register", processRegister);
router.get("/login", viewLogin);
router.post("/login", processLogin);

module.exports = router;