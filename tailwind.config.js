/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6F00FF',
        'secondary': '#e07a5f',
        'backdrop': '#3d405b',
        'alert': '#81b29a',
        'warning': '#f2cc8f'
      }
    },
  },
  plugins: [],
}