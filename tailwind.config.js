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
      input: "rgba(0, 0, 0, 0.003)",
      gray: "#8492a6",
      "gray-light": "#e6e6e6",
    },
    fontFamily: {
      sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        110: "78px",
        200: "198px",
        340: "340px",
        390: "399px",
        424: "420px",
        429: "429px",
        400: "404px",
        128: "535px",
        144: "546px",
        500: "510px",
        550: "550px",
      },
      fontSize: { 83: "100px", 22: "22px" },
      fontWeight: { semibold: "500", text: "500" },
      boxShadow: {
        editInp: "inset 0 -1px 5px 0 rgb(0 0 0 / 20%)",
        inp: "inset 0 -2px 1px rgb(0 0 0 / 5%)",
        xl: "0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%)",
        sl: "0 1px 1px rgb(0 0 0 / 20%), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgb(0 0 0 / 20%), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgb(0 0 0 / 20%)",
      },
      backgroundImage: {
        checkbox:
          "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
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
        60: "60px",
      },
      outlineWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
