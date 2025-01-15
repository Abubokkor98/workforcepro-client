/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: '#0c0f11',
        background: '#f4f7f7',
        primary: '#75939e',
        secondary: '#b1aac4',
        accent: '#a691b2',
      },
    },
  },
  plugins: [],
};
