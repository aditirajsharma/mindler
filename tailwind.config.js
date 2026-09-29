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
        dark: {
          bg: '#0A0A0F',
          surface: '#15121F',
          surfaceHover: '#1E192D',
          border: 'rgba(168, 85, 247, 0.2)',
          borderHover: 'rgba(168, 85, 247, 0.5)',
          muted: '#120F1C',
        },
        neon: {
          purple: '#A855F7',
          violet: '#C084FC',
          pink: '#E879F9',
          glow: '#9333EA',
          deep: '#1A0B2E',
        },
        text: {
          primary: '#F5F3FF',
          secondary: '#A1A1B5',
          muted: '#717188',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(168, 85, 247, 0.25)',
        'neon-strong': '0 0 30px rgba(168, 85, 247, 0.45)',
        'neon-pink': '0 0 25px rgba(232, 121, 249, 0.35)',
        'card-glow': '0 0 20px rgba(168, 85, 247, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'amber-glow': '0 0 25px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(192, 132, 252, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
