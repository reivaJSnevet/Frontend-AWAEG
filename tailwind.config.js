/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors:{
            customBlack: '#332941',
            navy: '#3B3486',
            customPurple: '#864AF9',
            customYellow: '#F8E559',
        }
    },
  },
  plugins: [],
}

