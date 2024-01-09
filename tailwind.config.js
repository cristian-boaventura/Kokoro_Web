/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fffafc",
          100: "#fff0f3",
          200: "#fde2e7",
          300: "#f5d4d9",
          400: "#e9b5bd",
          500: "#d98c9a",
          600: "#c56f82",
          700: "#b24c63",
          800: "#8d2b45",
          900: "#64222e",
          950: "#3d1a1f",
        },
      },
    },
  },
  plugins: [],
};
