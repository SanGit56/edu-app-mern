const express = require("express");
const router = express.Router();

const { createClass, readAllClass, readOneClass, updateClass, deleteClass } = require("../controllers/classController.js");

router.post("/", createClass);
router.get("/", readAllClass);
router.get("/:id", readOneClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;