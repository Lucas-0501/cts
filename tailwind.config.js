/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        graphite: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c0c0c0',
          400: '#808080',
          500: '#606060',
          600: '#505050',
          700: '#404040',
          800: '#303030',
          900: '#202020',
        },
        emerald: {
          400: '#6ee7b7',
          500: '#10b981',
          600: '#059669',
        },
      },
    },
  },
  plugins: [],
};
