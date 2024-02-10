import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [video, setVideo] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    document.getElementById("upload-file").click();
  };

  const localUpload = async (event) => {
    const file = event.target.files[0];
    const videoObjectURL = URL.createObjectURL(file);
    setVideo(videoObjectURL);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("video", file);

      // Send the file to your backend server for saving
      const response = await axios.post(
        "http://localhost:3000/api/saveVideo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response from server if necessary
      console.log("Video saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving video:", error);
      // Handle errors
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
        <p className="mt-10 text-center  text-xl  font-comic  w-4/5">
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
              {video ? (
                <div className="flex flex-row justify-center items-center gap-3">
                  <label htmlFor="prompt">Prompt : </label>
                  <TextField
                    id="outlined-basic"
                    label="Prompt ..."
                    variant="outlined"
                  />
                </div>
              ) : (
                <p className="text-xl  font-[10]  ">
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
                {video && (
                  <div>
                    <video controls width="400">
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
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
                  onChange={localUpload}
                  style={{ display: "none" }}
                />

                <button className="h-20 w-72 rounded-full bg-gray-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-65 text-center flex flex-row justify-center items-center">
                  Upload
                </button>
              </div>
            )}

            <div>
              {/* {video && (
                <div>
                  <video controls width="400">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
