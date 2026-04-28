/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'display': ['Playfair Display', 'serif'],
      },
      colors: {
        navy: {
          900: '#0F172A',
          800: '#1E293B',
        },
        accent: {
          DEFAULT: '#DEFF9A',
          hover: '#CDFF66',
        },
        orange: {
          500: '#F59E0B',
        }
      },
      animation: {
        'subtle-zoom': 'subtle-zoom 20s infinite alternate ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-whatsapp': 'pulseWhatsApp 2s infinite',
        'glow': 'glow 3s infinite alternate',
      },
      keyframes: {
        'subtle-zoom': {
          'from': { transform: 'scale(1.1)' },
          'to': { transform: 'scale(1.05)' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseWhatsApp: {
          '0%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(222, 255, 154, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(222, 255, 154, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
