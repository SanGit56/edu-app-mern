const express = require("express");
const router = express.Router();

const { createStudent, readAllStudent } = require("../controllers/studentController.js");

router.post("/", createStudent);
router.get("/", readAllStudent);

module.exports = router;