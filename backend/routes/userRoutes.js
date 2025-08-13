const express = require("express");
const router = express.Router();

const { readAllUser, updateUser, deleteUser } = require("../controllers/userController.js");

router.get("/", readAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;