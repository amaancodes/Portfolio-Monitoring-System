// models/Portfolio.js
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  portfolioName: { type: String, required: true },
  level1Responsibilities: { type: String, required: true },
  level2Responsibilities: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: { type: Date },
  remark: { type: String },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
