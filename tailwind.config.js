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
      },
      transitionProperty : {
        'height' : 'height'
      },
      boxShadow: {
        'well': 'inset 0 2px 2px hsla(0, 0%, 0%, 0.1), inset 0 -3px 0 hsla(0, 0%, 100%, .15)',
        'bump': 'inset 0 2px 0 hsl(270, 84%, 80%), 0 1px 3px hsla(0, 0%, 0%, .2)',
      }
    },
  },
  plugins: [],
}