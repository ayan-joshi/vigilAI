const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;
const videosDirectory = path.join(__dirname, "..", "Videos");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videosDirectory); // Save files to the 'Videos' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ storage: storage });

// POST endpoint for saving video
app.post("/api/saveVideo", upload.single("video"), (req, res) => {
  // Check if file was uploaded successfully
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Return a success message with the filename
  res.send(`Video '${req.file.originalname}' saved successfully.`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
