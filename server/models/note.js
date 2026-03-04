const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [String],

    difficulty: {
      type: String,
      default: "Beginner",
    },

    concept: String,
    payload: String,
    explanation: String,
    mitigation: String,
    references: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
