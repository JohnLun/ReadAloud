/* eslint no-undef: 0 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      papyrus: {
        200: "#fed7aa",
        300: "#fdba74",
      },
      brown: {
        800: "#854d0e",
        900: "#713f12",
      },
    },
    extend: {},
  },
  plugins: [],
};
