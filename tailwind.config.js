/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00FF94',
          blue: '#00E5FF',
        },
        dark: {
          bg: '#0A0A0A',
          card: '#121212',
          surface: '#1E1E1E'
        },
        metallic: {
          silver: '#E0E0E0',
          gray: '#A0A0A0'
        }
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
