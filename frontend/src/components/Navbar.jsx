// Navbar.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // states for the modal
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    number: "",
  });

  // function for details when changed
  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitDetail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/submit-details",
        details
      );
      console.log("Response from backend:", response.data);
      // Handle response from backend if necessary
    } catch (error) {
      console.error("Error submitting details:", error);
      // Handle error
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="w-11/12 z-20 top-0 left-0 lg:px-12   border border-[#D9D9D9]  bg-[#FFFFFF]  rounded-full font-monserrat"
      style={{
        // background: "rgb(225,246,249)",
        // background:
        //   "linear-gradient(133deg, rgba(225,246,249,1) 4%, rgba(81,156,233,1) 100%)",
        background: "#E1F6F9",
        color: "black",
      }}
    >
      <div className="flex flex-wrap items-center justify-between lg:px-8 sm:px-4 px-5 py-2">
        <p className="flex items-center justify-between">
          <span className="font-monserrat text-2xl  whitespace-nowrap text-black  ">
            VigilAI
          </span>
        </p>

        <div className="flex md:order-2 justify-center align-middle items-center">
          <button
            onClick={handleOpen}
            type="button"
            className="text-white bg-[#516AE9] h-6 font-Montserrat hover:bg-indigo-100 hover:text-black transition-all duration-300 font-thin rounded-full font-monserrat text-white lg:text-base sm:text-sm text-xs lg:px-6 px-5 lg:h-12 lg:py-1 py-0 text-center mr-3 md:mr-0"
          >
            authenticate
          </button>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
            aria-controls="navbar-sticky"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between gap-10 w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
        >
          <p className="font-monserrat font-thin ">
            Simplified Verison For You
          </p>
          {/* modal for the details */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter Your details
              </Typography>
              <div className="flex flex-col justify-center items-center gap-2 mt-4">
                <TextField required id="outlined-required" label="Name" />
                <TextField required id="outlined-required" label="Email" />

                <TextField
                  required
                  id="outlined-required"
                  label="Phone Number"
                />

                <button
                  className="bg-[#000000]  p-4 rounded-lg  text-white"
                  onClick={submitDetail}
                >
                  Submit
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
