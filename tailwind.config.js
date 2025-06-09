module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  // ✅ for App Router
    "./pages/**/*.{js,ts,jsx,tsx}",    // optional fallback
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
