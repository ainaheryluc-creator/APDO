import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // APDO Brand Colors - Warm and Professional
        'apdo': {
          'gold': '#D4A574',      // Primary gold
          'warm': '#E8D5C4',      // Warm beige
          'earth': '#8B6F47',     // Earth brown
          'cream': '#F5F0E8',     // Cream background
          'forest': '#2D5F3F',    // Forest green (hope)
          'accent': '#C4845A',    // Warm accent
        },
      },
      fontFamily: {
        sans: ['Geist', ...defaultTheme.fontFamily.sans],
        serif: ['Geist', ...defaultTheme.fontFamily.serif],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
