/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tomato: 'rgb(235, 78, 98)', // Custom color in RGB
        star : 'rgb(255, 255, 0)'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Add Roboto font
      },
    },
  },
  plugins: [],
}

