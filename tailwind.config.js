/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0F172A',
        },
        teal: {
          600: '#0D9488',
        },
        orange: {
          500: '#F59E0B',
        }
      },
      animation: {
        'subtle-zoom': 'subtle-zoom 20s infinite alternate ease-in-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'pulse-whatsapp': 'pulseWhatsApp 2s infinite',
      },
      keyframes: {
        'subtle-zoom': {
          'from': { transform: 'scale(1.1)' },
          'to': { transform: 'scale(1.05)' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseWhatsApp: {
          '0%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
        }
      }
    },
  },
  plugins: [],
}
