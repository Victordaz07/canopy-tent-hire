/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF8F3',
        bg2: '#FFFFFF',
        card: '#FFFFFF',
        canopy: {
          DEFAULT: '#2F7A52',
          dim: '#1F5A3B',
        },
        sun: {
          DEFAULT: '#E0923C',
          dim: '#C8762A',
        },
        sand: '#D9A954',
        ink: '#1F2A22',
        muted: '#766F60',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
