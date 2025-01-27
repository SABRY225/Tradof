/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": ['"Roboto Condensed"', "serif"], // Add the font family
        poppins: ['"Poppins"', "serif"], // Adding Poppins font family
        epilogue: ['"Epilogue"', "serif"],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      fontSize: {
        xs: "0.75rem", // Existing sizes for reference
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        // Add custom sizes here
        "custom-small": "0.7rem", // Example custom size
        "custom-large": "2.7rem", // Example custom size
        "custom-huge": "4.5rem", // Example custom size
      },
      colors: {
        customGray: "#C8C8D0", // Define your custom color
        "second-color": "#FF6F61",
        "main-color": "#6C63FF",
        "border-color": "#D9D9D9",
      },
    },
  },
  plugins: [],
  // Add custom styles
  safelist: ["custom-phone-input"], // Optional: To ensure classes are not purged
  darkMode: "class", // Optional for dark mode if you're using it
};
