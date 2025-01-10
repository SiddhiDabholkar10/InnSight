/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-300": "#f0f5ff",
        "primary": "#faa6ff",
        "mauve-500": "#faa6ff",
        "secondary":"#1d3461"
        
      },
      boxShadow: {
        'primary-500': '0px 4px 6px rgba(250, 166, 255, 0.3)', // Adding shadow-primary using the primary color
      },
    },
  },
  plugins: [],
}

