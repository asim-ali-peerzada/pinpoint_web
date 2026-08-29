/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#08090B',
          card: '#0D0F12',
          'card-hover': '#121417',
          border: '#22252A',
          'border-active': '#2F3339',
          accent: '#E3342F',
          'accent-glow': 'rgba(227, 52, 47, 0.15)',
          muted: '#A1A1AA',
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
