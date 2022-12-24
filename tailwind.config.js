/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Hind Vadodara", "sans-serif"],
      sub: ["Actor", "sans-serif"],
      body: ["Source Sans Pro", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
