/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#06080D',
          card: '#0D111A',
          'card-hover': '#151B28',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(255, 255, 255, 0.16)',
          accent: '#FF2D20',
          'accent-glow': 'rgba(255, 45, 32, 0.15)',
          muted: '#8B949E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'mesh': 'mesh 15s ease infinite alternate',
      },
      keyframes: {
        mesh: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '100%': { transform: 'translate(-20px, 15px) scale(0.95)' },
        }
      }
    },
  },
  plugins: [],
};
