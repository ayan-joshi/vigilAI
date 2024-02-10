const express = require("express");
const app = express();

const bodyParser = require("body-parser");
// const cors = require("cors");
const multer = require("multer");
const Vimeo = require("vimeo").Vimeo;

const port = 3001;

// app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Parse incoming request bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Configure file upload
// const upload = multer({ dest: "uploads/" });

// Vimeo client
const vimeoClient = new Vimeo({
  client_id: "8abd2047fee2653ba9058f29b1076f06456f7bb8",
  client_secret: "P8Ddv0yyY6zGKyS61ctiidxUNXga",
  access_token: "7ee34a800183a89011570c0a42c392e2",
});

// Video upload endpoint
// app.post("/upload", upload.single("video"), async (req, res) => {
//   console.log("this is the upload route");

//   try {
//     const vimeo = new Vimeo({
//       client_id: "8abd2047fee2653ba9058f29b1076f06456f7bb8",
//       client_secret: "P8Ddv0yyY6zGKyS61ctiidxUNXga",
//       access_token: "7ee34a800183a89011570c0a42c392e2",
//     });
//     const { originalname, path } = req.file; // Get video file details

//     // Create video upload options
//     const options = {
//       filename: originalname,
//       privacy: "private", // Set desired privacy level
//       // Add other customization options if needed
//     };

//     // Upload video to Vimeo
//     const uploadResponse = await vimeo.videos.upload(path, options);

//     // Get uploaded video details
//     const video = await vimeo.videos.get(uploadResponse.uri);

//     res.json({ success: true, video: video }); // Send video details to client
//   } catch (error) {
//     console.error("Error uploading video:", error);
//     res.status(500).json({ success: false, message: "Error uploading video" });
//   }
// });

app.post("/upload", (req, res) => {
  console.log(req.body);
  res.send("this is the answer");
  // Get the path of the uploaded file
  const filePath = req.file.path;

  // Perform upload operation to Vimeo
  vimeoClient.upload(
    filePath,
    {},
    (uri) => {
      console.log("Video uploaded successfully. Vimeo URI:", uri);
      // Send the Vimeo video URI back to the client
      res.json({ uri });
    },
    (bytes_uploaded, bytes_total) => {
      console.log(`${bytes_uploaded} bytes uploaded out of ${bytes_total}`);
    },
    (error) => {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Failed to upload video to Vimeo" });
    }
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
