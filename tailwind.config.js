const { keyframes } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  darkMode: 'media',
  content: [
    './app/root.tsx',
    './app/{**/*.js,**/*.jsx,**/*.ts,**/*.tsx}',
    './components/{**/*.js,**/*.jsx,**/*.ts,**/*.tsx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'blur-in': 'blur-in linear 400ms',
        orbit: 'orbit linear 40s infinite',
        'counter-orbit': 'counter-orbit linear 40s infinite',
      },
      keyframes: {
        'blur-in': {
          '0%': { filter: 'blur(10px)' },
          '100%': { blur: 'blur(0)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'counter-orbit': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
}
