/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["Fredoka One", "cursive"]
      }
    }
  },
  plugins: [
    require("tailwind-scrollbar")
  ]
}
