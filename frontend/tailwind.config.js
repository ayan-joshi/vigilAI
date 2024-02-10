/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        monserrat: ["Montserrat", "sans-serif"],
        comic: ["Comic Neue", "sans-serif"],
      },
      // fontWeight: {
      //   thin: 100,
      //   light: 300,
      //   normal: 400,
      //   medium: 500,
      //   semibold: 600,
      //   bold: 700,
      //   extrabold: 800,
      //   black: 900,
      // },

      colors: {
        customBlue: "rgba(81, 106, 233, 1)",
        lightBlue: "rgba(122, 160, 233, 1)",
      },
    },
  },
  plugins: [],
};
