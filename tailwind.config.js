module.exports = {
  content: ['./app.vue', './components/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
