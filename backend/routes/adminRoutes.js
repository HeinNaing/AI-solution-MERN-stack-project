const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const adminController = require("../controllers/adminController");
const handleErrorMessages = require("../middlewares/handleErrorMessages");
const AdminUser = require("../models/AdminUser");

router
    .route("/login")
    .post(
        [
            body("email").notEmpty().withMessage("Email is required"),
            body("email").custom(async (email) => {
                let user = await AdminUser.findOne({ email });
                if (!user) {
                    throw new Error("Email not exists");
                }
            }),
            body("password").notEmpty().withMessage("Password is required"),
        ],
        handleErrorMessages,
        adminController.login
    );

router
    .route("/register")
    .post(
        [
            body("name").notEmpty().withMessage("Name is required"),
            body("email").notEmpty().withMessage("Email is required"),
            body("email").custom(async (email) => {
                let user = await AdminUser.findOne({ email });
                if (user) {
                    throw new Error("Email already exists");
                }
            }),
            body("password").notEmpty().withMessage("Password is required"),
        ],
        handleErrorMessages,
        adminController.register
    );

router
    .route("/logout")
    .post(adminController.logout);

module.exports = router;    
