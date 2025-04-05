const express = require("express");
const contactController = require("../controllers/contactController");
const { body } = require("express-validator");
const handleErrorMessages = require("../middlewares/handleErrorMessages");
const Contact = require("../models/Contact");

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
router.get("/filter/country/:country", contactController.getContactsByCountry);
router.get("/:id", contactController.getContact);
router.post("/", contactValidation, handleErrorMessages, contactController.createContact);
router.post("/send-email", contactController.sendEmail);
router.delete("/:id", contactController.deleteContact);

// Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
      error: error.message
    });
  }
});

module.exports = router;
