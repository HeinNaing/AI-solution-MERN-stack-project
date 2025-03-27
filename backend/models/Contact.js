const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
