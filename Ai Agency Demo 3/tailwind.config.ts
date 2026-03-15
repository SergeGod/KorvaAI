import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffbf71',
          400: '#ff9938',
          500: '#ff7a12',
          600: '#f05e07',
          700: '#c74408',
          800: '#9e360f',
          900: '#7f2e10',
          950: '#451404',
        },
        amber: {
          glow: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'glitch-1': {
          '0%':   { clipPath: 'inset(40% 0 60% 0)', transform: 'translate(-4px, 0)' },
          '20%':  { clipPath: 'inset(10% 0 85% 0)', transform: 'translate(4px, 0)' },
          '40%':  { clipPath: 'inset(70% 0 15% 0)', transform: 'translate(-2px, 0)' },
          '60%':  { clipPath: 'inset(25% 0 50% 0)', transform: 'translate(3px, 0)' },
          '80%':  { clipPath: 'inset(55% 0 30% 0)', transform: 'translate(-3px, 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)',      transform: 'translate(0, 0)' },
        },
        'glitch-2': {
          '0%':   { clipPath: 'inset(60% 0 25% 0)', transform: 'translate(4px, 0)' },
          '25%':  { clipPath: 'inset(15% 0 70% 0)', transform: 'translate(-4px, 0)' },
          '50%':  { clipPath: 'inset(80% 0 5%  0)', transform: 'translate(3px, 0)' },
          '75%':  { clipPath: 'inset(35% 0 45% 0)', transform: 'translate(-2px, 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)',      transform: 'translate(0, 0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.7s ease-out forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glitch-1':   'glitch-1 0.5s steps(1) forwards',
        'glitch-2':   'glitch-2 0.5s steps(1) 0.05s forwards',
      },
    },
  },
  plugins: [],
}

export default config
