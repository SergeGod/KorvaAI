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
        background: '#0A0F1C',
        surface: '#111827',
        'surface-2': '#131E35',
        border: '#1E293B',
        'border-bright': '#2D3A52',
        primary: '#2563EB',
        'primary-light': '#3B82F6',
        'primary-dim': '#1D4ED8',
        accent: '#60A5FA',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        'text-muted': '#4B5563',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(96, 165, 250, 0.04) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(37, 99, 235, 0.3)',
        'glow-md': '0 0 40px rgba(37, 99, 235, 0.4)',
        'card': '0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

export default config
