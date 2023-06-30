/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1b212a",
      },
      textShadow: {
        lila: "2px 2px 5px rgba(169,141,229, 1)",
        blue: "2px 2px 5px rgba(73, 163, 222  , 1)",
        white: "2px 2px 8px rgba(255, 255, 255  , 1)",
      },
    },
    backgroundImage: {
      hero: "url('./assets/img/bg-min.jpg')",
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
