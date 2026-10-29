/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1F3D',
          50: '#F0F4FA',
          100: '#D9E3F3',
          200: '#B0C5E6',
          700: '#16284D',
          800: '#0F1F3D',
          900: '#0A1529',
          950: '#060D1A',
        },
        page: '#F8F9FB',
        civic: {
          teal: '#10B981',
          tealDark: '#059669',
          tealLight: '#ECFDF5',
          amber: '#F59E0B',
          amberDark: '#D97706',
          amberLight: '#FFFBEB',
          navy: '#0F1F3D',
          grayBg: '#F8F9FB',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        cardHover: '0 10px 25px -5px rgba(15, 31, 61, 0.08), 0 8px 10px -6px rgba(15, 31, 61, 0.05)',
      }
    },
  },
  plugins: [],
}
