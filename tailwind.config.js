module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0rem',
        sm: '1rem',
        lg: '8rem',
        xl: '18rem',
        '2xl': '24rem',
      },
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["dark"]
  }
}
