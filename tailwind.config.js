/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Fresh Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534', // Deep Green (Brand Primary)
          900: '#14532d',
          950: '#052e16'
        },
        cream: {
          50: '#FAF9F5',
          100: '#FAFAF5', // Background Light Cream
          200: '#F3F2EB',
          300: '#E8E6DB',
          400: '#D5D2C2'
        },
        charcoal: {
          50: '#f8fafc',
          800: '#1F2937', // Dark Charcoal
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 101, 52, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(22, 101, 52, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [],
}
