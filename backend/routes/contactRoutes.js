const express = require("express");
const contactController = require("../controllers/contactController");
const { body } = require("express-validator");
const handleErrorMessages = require("../middlewares/handleErrorMessages");

const router = express.Router();

// Validation middleware
const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("companyName").trim().notEmpty().withMessage("Company name is required"),
  body("jobTitle").trim().notEmpty().withMessage("Job title is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

// Routes
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContact);
router.post("/", contactValidation, handleErrorMessages, contactController.createContact);
router.post("/send-email", contactController.sendEmail);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
