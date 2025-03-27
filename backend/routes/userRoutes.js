const express = require("express");
//third party file
const userController = require("../controllers/userController");

const router = express.Router();
router.get("/", userController.getUser);

module.exports = router;
