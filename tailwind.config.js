/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"], // Corregido: Se utilizaron comillas correctamente.
  theme: {
    screens: {
      sw: "340px",
      md: "540px",
      lg: "768px",
      xl: "1180px",
    },
    extend: {},
    fontFamily: {
      Jost: ["Jost", "sans-serif"],
      Lobster: ["Lobster", "sans-seri"]
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
        md: "32px"
      }
    }
  },
  plugins: [],
}

