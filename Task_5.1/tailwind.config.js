/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
