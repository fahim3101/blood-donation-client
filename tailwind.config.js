/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1F1',
          100: '#FFE1E1',
          200: '#FFC7C7',
          300: '#FFA0A0',
          400: '#FB6F6F',
          500: '#F14545',
          600: '#DC2828',
          700: '#B81E1E',
          800: '#931C1C',
          900: '#7A1C1C',
        },
        cream: '#FFF8F5',
        blush: '#FFE9E4',
      },
      fontFamily: {
        heading: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(220, 40, 40, 0.08)',
      },
    },
  },
  plugins: [],
};
