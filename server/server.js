const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");
const protect = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://cyber-notes-hub.vercel.app"],
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
});
app.post("/api/notes", protect, async (req, res) => {
  try {
    const {
      title,
      summary,
      category,
      topic,
      difficulty,
      order,
      tags,
      concept,
      payload,
      explanation,
      mitigation,
      references,
    } = req.body;
    const newNote = new Note({
      title,
      summary,
      category,
      topic,
      difficulty,
      order,
      tags,
      concept,
      payload,
      explanation,
      mitigation,
      references,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ order: 1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not Found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/api/notes/:id", protect, async (req, res) => {
  try {
    const {
      title,
      summary,
      category,
      topic,
      difficulty,
      order,
      tags,
      concept,
      payload,
      explanation,
      mitigation,
      references,
    } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        summary,
        category,
        topic,
        difficulty,
        order,
        tags,
        concept,
        payload,
        explanation,
        mitigation,
        references,
      },
      { new: true, runValidators: true },
    );
    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/api/notes/:id", protect, async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ deleteNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // IMPORTANT: For cross-origin cookies (Vercel ↔ Render)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/admin/me", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
