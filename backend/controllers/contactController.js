const Contact = require("../models/Contact");

const contactController = {
  // Send email to contact
  sendEmail: async (req, res) => {
    try {
      const { email, name } = req.body;
      // For now, just simulate email sending
      console.log(`Simulating email send to ${name} at ${email}`);
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  },

  // Get all contacts
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new contact
  createContact: async (req, res) => {
    try {
      const contact = new Contact(req.body);
      const savedContact = await contact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete contact
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContact = await Contact.findByIdAndDelete(id);

      if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single contact
  getContact: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findById(id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = contactController;
