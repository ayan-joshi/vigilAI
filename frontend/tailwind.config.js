/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        monserrat: ["Montserrat", "sans-serif"],
      },

      colors: {
        customBlue: "rgba(81, 106, 233, 1)",
        lightBlue: "rgba(122, 160, 233, 1)",
      },
    },
  },
  plugins: [],
};
