const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "Title must contain minimum 3 Characters!"],
    maxLength: [30, "Job title can not be more than 30 character"],
  },
  description: {
    type: String,
    required: [true, "Please give description"],
    minLength: [30, "description must contain minimum 30 Characters!"],
    maxLength: [500, "Job description can not be more than 500 character"],
  },
  category: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Location must contian at least 15 characters!"],
  },
  salaryType: {
    type: String,
    enum: ["Fixed Salary", "Ranged Salary"],
    required: true,
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot be more than 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot be more than  9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Job", jobSchema);
