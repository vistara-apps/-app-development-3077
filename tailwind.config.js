/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220, 80%, 50%)',
        accent: 'hsl(140, 50%, 60%)',
        bg: 'hsl(220, 15%, 95%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(220, 15%, 20%)',
        'text-secondary': 'hsl(220, 15%, 40%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'card': '0 2px 6px hsla(0, 0%, 0%, 0.1)',
      },
    },
  },
  plugins: [],
}