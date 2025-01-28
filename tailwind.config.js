import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'note.type' },
          '50%': { backgroundColor: 'rgb(185 28 28)' },
        },
        slideInOut: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '25%': { transform: 'translateX(0)', opacity: '0.5' },
          '75%': { transform: 'translateX(0)', opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        slideInOut: 'slideInOut 2s ease-in-out',
      },
    },
  },
  plugins: [
      scrollbarHide,
  ],
}

