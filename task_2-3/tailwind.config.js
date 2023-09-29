/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
  ],
  theme: {
    colors: {
      base: {
        dark: '#28293E',
        light: '#FDF0E9',
      },
      content: {
        dark: '#391400',
        'dark-accent': '#EF6D58',
        light: '#FFFFFF',
      },
    },
    fontFamily: {
      sans: ['Epilogue', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
