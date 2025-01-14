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
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [
      scrollbarHide,
  ],
}

