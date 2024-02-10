import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress for loading animation
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import CloudUploadIcon for upload icon
import UploadIcon from "@mui/icons-material/Upload";

function App() {
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleUpload = () => {
    // Function to handle upload action
    setLoading(true); // Set loading state to true to show loading animation
    // Perform upload operation here, for example, make an API call
    setTimeout(() => {
      // Simulate upload process with a timeout
      setLoading(false); // Set loading state back to false after upload completion
    }, 2000); // Simulate 2 seconds of upload time
  };

  return (
    <div className="flex flex-col  h-screen">
      <Navbar />

      <div className="h-full bg-blue-400 flex justify-center items-center ">
        <div className="w-11/12 bg-blue-100 h-4/5 flex flex-row justify-between items-center border rounded-3xl">
          <div className="w-1/2 flex flex-col justify-center items-center ">
            <div className="flex flex-row justify-center items-center gap-4">
              <label htmlFor="prompt">Prompt : </label>
              <TextField
                id="outlined-basic"
                label="Prompt ... "
                variant="outlined"
              />
            </div>
          </div>
          <div className=" w-1/2 flex flex-col bg-blue-200  rounded-3xl h-full justify-center items-center">
            {loading ? (
              <CircularProgress /> // Show CircularProgress while loading
            ) : (
              <button
                className="bg-blue-500 flex flex-col justify-center  items-center h-[100px] w-[100px] rounded-full text-white p-2 "
                onClick={handleUpload} // Call handleUpload function on button click
              >
                <UploadIcon fontSize="large" />
                Upload {/* Use CloudUploadIcon */}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
