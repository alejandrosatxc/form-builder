/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eggplant': '#f4f1de',
        'terra-cotta': '#e07a5f',
        'independence': '#3d405b',
        'green-sheen': '#81b29a',
        'deep-cham': '#f2cc8f'
      }
    },
  },
  plugins: [],
}