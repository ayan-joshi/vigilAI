// Navbar.js
import React, { useState } from "react";
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          {/* <ul className="flex flex-col p-4 md:p-0 mt-4 text-base font-normal md:flex-row md:space-x-8 md:mt-0 font-Montserrat"> */}
          {/* <li>
              <p className="block py-2 pl-3 pr-4 text-black rounded lg:hover:scale-125 cursor-pointer transition-all duration-300 md:p-0">
                Home
              </p>
            </li>
            <li>
              <p className="block py-2 pl-3 pr-4 text-black rounded lg:hover:scale-125 cursor-pointer transition-all duration-300 md:p-0">
                About Us
              </p>
            </li>
            {/* <li onClick={() => handleClickScroll("careers-section")}> */}
          {/* <li>
              <p className="block py-2 pl-3 pr-4 text-black rounded lg:hover:scale-125 cursor-pointer transition-all duration-300 md:p-0">
                Contact Us
              </p>
            </li> 
          </ul>{" "}
          */}
          <p className="font-monserrat font-thin ">
            Simplified Verison For You
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
