/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme: Dynamic via CSS Variables
        'portfolio-green': 'var(--color-portfolio-green)', 
        'portfolio-beige': 'var(--color-portfolio-beige)', 
        'portfolio-orange': 'var(--color-portfolio-orange)', 
        'portfolio-yellow': 'var(--color-portfolio-yellow)', 
        'portfolio-dark': 'var(--color-portfolio-dark)', 
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
