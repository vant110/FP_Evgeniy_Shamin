/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.ts",
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
  plugins: [require('daisyui')],
  daisyui: {
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
