/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        alabaster: '#FAF8F5',
        obsidian: '#0B0C10',
        champagne: {
          DEFAULT: '#C5A059',
          light: '#E5C378',
          dark: '#8A6626',
        },
        bronze: '#8C6239',
      },
    },
  },
  plugins: [],
};
