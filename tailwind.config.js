/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    important: true,
    display: ["group-hover"],
    visibility: ["group-hover"],
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      white: "#ffffff",
      main: "#f5f5f5",
      black: "#000000",
      red: "#800000",
      h1: "rgba(175, 47, 47, 0.15)",
      grey: "#13ce66",
      green: "#50C878",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        340: "340px",
        390: "399px",
        400: "404px",
        128: "517px",
        144: "522px",
        500: "500px",
      },
      fontSize: { 83: "100px" },
      borderOpacity: {
        10: "0.1",
        20: "0.2",
        50: "0.5",
        75: "0.75",
        95: "0.95",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      height: {
        5: "5px",
      },
      padding: {
        6: "6px",
        16: "16px",
        64: "64px",
      },
      outlineWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
