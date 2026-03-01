const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  tags: [
    {
      type: String
    }
  ],

  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },

  platform: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);