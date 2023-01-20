/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'piano-black': '#18181c',
        'satin-deep-black': '#1b1a1e',
        'white-smoke': '#f4f4f6',
        
      },
    },
      fontFamily: {
        primary: ['var(--inter-font)', ...fontFamily.sans],
        serif: ['var(--inter-font)', ...fontFamily.serif],
        ['merry']: ['Merriweather', ...fontFamily.serif],
      },
    },
    plugins: [require("daisyui")],
  }