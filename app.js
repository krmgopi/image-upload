import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/config.js";
import multer from "multer";
import User from "./modal/User.js";
import upload from "./multerconfig.js";
import fs from "fs";
dotenv.config();
connectDB();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/uploads", (req, res, next) => {
  upload.single("photo")(req, res, (err) => {
    const { title, description } = req.body;

    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "File not uploaded." });
    }

    res.send(req.file);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
