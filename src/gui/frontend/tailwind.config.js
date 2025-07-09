/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zen Browser inspired color palette
        primary: {
          50: '#FEF7F0',
          100: '#FEEAD8',
          200: '#FDD4B0',
          300: '#FBB87D',
          400: '#F8954A',
          500: '#E8A87C', // Main primary
          600: '#D4894D',
          700: '#B16B2C',
          800: '#8E4F1F',
          900: '#6B3B17',
        },
        secondary: {
          50: '#F4F6F8',
          100: '#E8ECF1',
          200: '#D1D9E3',
          300: '#A6B8CC',
          400: '#8B9AAF', // Main secondary
          500: '#6F7E93',
          600: '#5A6776',
          700: '#4A5563',
          800: '#3D4651',
          900: '#2F3742',
        },
        background: {
          light: '#FEFCF8',
          warm: '#F5F2ED',
          cream: '#F0EDE6',
        },
        accent: {
          brown: '#D4B896',
          warmGray: '#A0958A',
        }
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}