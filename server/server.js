const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newNote = new Note({
      title,
      content,
      category,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(201).json(notes);
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
app.put("/api/notes/:id", async (req, res) => {
  try {
    const {title, content,category} = req.body ;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {title,content, category },
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
app.delete("/api/notes/:id", async(req,res) => {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote){
            return res.send(404).json({message : "Note not found"});
        }
        res.status(200).json({deleteNote});
    }catch(error){
        res.status(500).json({message: error.message});
    }
})
app.post("/api/admin/login", async(req, res) => {
  try{
    const {email, password} = req.body ;
    const admin = await Admin.findOne({email});
    if(!admin){
      return res.status(400).json({message:"Invalid Credentials"});
    }
    const isMatch = await bcrypt.compare(password,admin.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const token = jwt.sign(
      {id  : admin._id},
      process.env.JWT_SECRET ,
      {expiresIn :"1d"}
    )
    res.status(200).json({token});
  }catch(error){
    res.status(500).json({message: error.message});
  }
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
