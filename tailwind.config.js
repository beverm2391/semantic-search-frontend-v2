/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      primary: ['var(--inter-font)', ...fontFamily.sans],
      serif: ['var(--inter-font)', ...fontFamily.serif],
      ['merry']: ['Merriweather', ...fontFamily.serif],
    },
  },
  plugins: [require("daisyui")],
}