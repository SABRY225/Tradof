/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
<<<<<<< HEAD
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/Auth/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor:"#6C63FF",
        cardColor:"#E5E5FF",
        cardColor2:"#B8B3FF",
        backLigth:"#F5F5FF",
        secondColor:"#FF6F61",
        red:"#FF0000",
        green:"#3DCF3D",
        balck:"#000000",
        button:"#FFA563"
      }
    },
=======
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src directory
  ],
  theme: {
    extend: {},
>>>>>>> d1a871fd9bffd711281ae10ab930c24b88e4004a
  },
  plugins: [],
};