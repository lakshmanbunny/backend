// backend/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
fs.access(uploadDir, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(uploadDir, (err) => {
      if (err) {
        console.error('Failed to create upload directory:', err);
      }
    });
  }
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Mongoose model
const File = mongoose.model('File', new mongoose.Schema({
  filename: String,
  path: String,
}));

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
    });
    await file.save();
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).send('File upload failed');
  }
});

module.exports = router;
