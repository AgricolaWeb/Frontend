/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        startButtonBack: "#ff9900",
        startButtonFont: "#fff7e9",
        personalCell: "#02C500",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
      },
    },
  },
  plugins: [],
};
