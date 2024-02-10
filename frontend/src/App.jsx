import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import UploadIcon from "@mui/icons-material/Upload";
import Vimeo from "vimeo";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    document.getElementById("upload-file").click();
  };

  const uploadVideoToVimeo = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setLoading(true);
    // console.log("hey this is running");
    // const vimeoClient = new Vimeo.Vimeo(
    //   "8abd2047fee2653ba9058f29b1076f06456f7bb8",
    //   "P8Ddv0yyY6zGKyS61ctiidxUNXga/4z0609bVgVqQMbxbEIBlMWvrfcuk12rqaEt8ytFeVZ2WoNcRRUEEXmfXv86sJvAFfHAFfpk2+y0RtkdyWBxCizgw1a5RFyhTYYn",
    //   "7ee34a800183a89011570c0a42c392e2"
    // );

    // // Perform upload operation to Vimeo
    // vimeoClient.upload(
    //   file,
    //   {},
    //   (uri) => {
    //     setLoading(false);
    //     console.log("Video uploaded successfully. Vimeo URI:", uri);

    //     // Now we need to get the video URL using the Vimeo API
    //     vimeoClient.request(
    //       {
    //         path: uri,
    //       },
    //       function (error, body, status_code, headers) {
    //         if (error) {
    //           console.error("Error fetching video details:", error);
    //           return;
    //         }
    //         const videoDetails = JSON.parse(body);
    //         setVideoUrl(videoDetails.link);
    //         console.log("Video URL:", videoDetails.link);
    //       }
    //     );
    //   },
    //   (bytes_uploaded, bytes_total) => {
    //     console.log(`${bytes_uploaded} bytes uploaded out of ${bytes_total}`);
    //   },
    //   (error) => {
    //     setLoading(false);
    //     console.error("Error uploading video:", error);
    //   }
    // );
    try {
      const formData = new FormData();
      formData.append("video", file);
      console.log("upload route frontend");

      const response = await axios.post(
        "http://localhost:3000/upload",
        formData
      ); // Send to backend endpoint

      setVideoUrl(response.data.video.link);
      console.log("Video URL:", response.data.video.link);
    } catch (error) {
      console.error("Error uploading to server:", error);
      // Handle error appropriately (e.g., display error message to user)
    } finally {
      setLoading(false);
    }
  };

  // new code from Ui to server
  const handleUploadToServer = async () => {
    setLoading(true);
    console.log("clicked upload");

    try {
      const formData = new FormData();
      formData.append("video", file);

      const response = await axios.post(
        "http://localhost:3000/upload",
        formData
      ); // Send to backend endpoint

      setVideoUrl(response.data.video.link);
      console.log("Video URL:", response.data.video.link);
    } catch (error) {
      console.error("Error uploading to server:", error);
      // Handle error appropriately (e.g., display error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-500">
      <div className="sticky top-5 flex flex-row items-center justify-center">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-row justify-center items-center">
        <p className="mt-10 text-center font-medium text-xl font-roboto w-4/5">
          A real-time video analysis system that understands natural language
          prompts and highlights relevant sections based on object detection,
          action recognition, and attribute recognition.
        </p>
      </div>

      <div className="h-full flex justify-center items-center">
        <div className="w-11/12 h-5/6 flex flex-row justify-between items-center border rounded-3xl bg-[#E1F6F9]">
          <div
            className="w-1/2 flex flex-col justify-center items-center h-full rounded-3xl"
            style={{
              background: "rgb(122,160,233)",
              backgroundImage:
                "radial-gradient(circle, rgba(122, 160, 233, 0.5) 0%, rgba(225, 246, 249, 1) 100%)",
            }}
          >
            <div className="flex flex-row justify-center items-center gap-4 text-center p-4 font-monserrat h-full rounded-3xl">
              {prompt ? (
                <div className="flex flex-row justify-center items-center gap-3">
                  <label htmlFor="prompt">Prompt : </label>
                  <TextField
                    id="outlined-basic"
                    label="Prompt ..."
                    variant="outlined"
                  />
                </div>
              ) : (
                <p className="font-medium">
                  Please begin by uploading your video prior to initiating the
                  prompt detection process within the content.
                </p>
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col bg-gradient-to-br from-customBlue to-blue-900 rounded-3xl h-full justify-center items-center">
            {loading ? (
              <CircularProgress />
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <div
                  className="h-32 w-72  bg-gray-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-65 text-center flex flex-col justify-center items-center cursor-pointer"
                  // onClick={handleUploadButtonClick}
                  onClick={handleUploadButtonClick}
                >
                  <UploadIcon fontSize="large" />
                  {file ? file.name : "Upload Video"}
                </div>
                <input
                  type="file"
                  id="upload-file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {videoUrl && <p>Video URL: {videoUrl}</p>}
                <button
                  className="h-20 w-72 rounded-full bg-gray-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-65 text-center flex flex-row justify-center items-center"
                  onClick={uploadVideoToVimeo}
                >
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
