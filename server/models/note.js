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

    difficulty: {
      type: String,
      default: "Beginner",
    },

    tags: [String],

    concept: {
      type: String,
      default: "",
    },

    payload: {
      type: String,
      default: "",
    },

    explanation: {
      type: String,
      default: "",
    },

    mitigation: {
      type: String,
      default: "",
    },

    references: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
