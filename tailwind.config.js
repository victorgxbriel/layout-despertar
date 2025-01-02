/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],  theme: {
    extend: {
      keyframes : {
        fadeIn : {
          '0%': { opacity: '0', transform: 'scale(0.9)'},
          '100%': { opacity: '1', transform: 'scale(1)'}
        },
        fadeOut : {
          '0%': { opacity: '1', transform: 'scale(1)'},
          '100%': { opacity: '0', transform: 'sacel(1.1)'}
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out'
      },
      colors : {
        purple : {
          1: 'var(--purple-1)',
          2: 'var(--purple-2)',
          3: 'var(--purple-3)'
        },
        gray: {
          0: 'var(--gray-0)',
          1: 'var(--gray-1)'
        }
      }
    },
  },
  plugins: [],
}

