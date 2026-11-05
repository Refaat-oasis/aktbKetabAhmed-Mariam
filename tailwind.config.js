/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        ruqaa: ['Aref Ruqaa', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
        monogram: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        gold: {
          light: '#fbf5b7',
          mid: '#d4af37',
          deep: '#aa771c',
        }
      }
    },
  },
  plugins: [],
}

