/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0F766E",
          emerald: "#10B981",
          crimson: "#DC2626",
          slate: "#0F172A",
          dark: "#0B1120"
        }
      }
    },
  },
  plugins: [],
}
