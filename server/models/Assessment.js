const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  name: String,
  jobRoles: [String],
  skills: [String],
  difficulty: String,
  duration: Number,
  description: String
});

module.exports = mongoose.model("Assessment", AssessmentSchema);
