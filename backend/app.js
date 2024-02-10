const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const { Vonage } = require("@vonage/server-sdk");

app.use(cors());
app.use(express.json());
const port = 3000;
const videosDirectory = path.join(__dirname, "..", "Videos");
const vonage = new Vonage({
  apiKey: "c72bef06",
  apiSecret: "JkeA3dx09aqC8afN",
});

// vonage ka api

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

app.post("/submit-details", async (req, res) => {
  const { name, email, number } = req.body;

  try {
    // Send OTP
    const resp = await vonage.verify.start({ number: number, brand: "vonage" });
    // console.log("Request ID:", resp.request_id);
    const request_id = resp.request_id;
    console.log(request_id);
    res.json({ success: true, requestId: request_id });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }

  console.log("Received user details:", { name, email, number });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
