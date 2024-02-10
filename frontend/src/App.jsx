import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress for loading animation
// import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import CloudUploadIcon for upload icon
import UploadIcon from "@mui/icons-material/Upload";

function App() {
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [prompt, setPrompt] = useState(false);

  const handleUpload = () => {
    setPrompt(true);

    // Function to handle upload action
    setLoading(true); // Set loading state to true to show loading animation
    // Perform upload operation here, for example, make an API call
    setTimeout(() => {
      // Simulate upload process with a timeout
      setLoading(false); // Set loading state back to false after upload completion
    }, 2000); // Simulate 2 seconds of upload time
  };

  return (
    <div className="flex flex-col   w-full  h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-500">
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

      <div className="h-full  flex justify-center items-center">
        <div className="w-11/12  h-5/6 flex flex-row justify-between items-center border rounded-3xl bg-[#E1F6F9] ">
          <div
            className="w-1/2 flex flex-col justify-center items-center  h-full rounded-3xl  "
            style={{
              background: "rgb(122,160,233)",
              backgroundImage:
                "radial-gradient(circle, rgba(122, 160, 233, 0.5) 0%, rgba(225, 246, 249, 1) 100%)",
            }}
          >
            <div className="flex flex-row justify-center items-center gap-4 text-center p-4 font-monserrat h-full  rounded-3xl">
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
          <div className=" w-1/2 flex flex-col bg-gradient-to-br from-customBlue to-blue-900  rounded-3xl h-full justify-center items-center">
            {loading ? (
              <CircularProgress /> // Show CircularProgress while loading
            ) : (
              // <button
              //   className="bg-blue-500 flex flex-col justify-center  items-center h-[100px] w-[100px] rounded-full text-white p-2 "
              //   onClick={handleUpload} // Call handleUpload function on button click
              // >
              //   <UploadIcon fontSize="large" />
              //   Upload {/* Use CloudUploadIcon */}
              // </button>

              <div className="flex flex-col justify-center items-center gap-2">
                <div className=" full h-32 w-72  rounded-3xl bg-gray-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-65  text-center flex flex-col  justify-center items-center">
                  Upload
                </div>
                <div className=" full h-20 w-72  rounded-full bg-gray-300 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-65 text-center flex flex-row justify-center items-center"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
