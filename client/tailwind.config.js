/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff00',
        dark: '#141414',
        'dark-light': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
