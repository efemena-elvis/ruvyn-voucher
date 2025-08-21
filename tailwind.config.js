/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          800: 'var(--color-neutral-800)',
        },
        // Direct mapping for text and background colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-on-primary': 'var(--color-text-on-primary)',
        'background-default': 'var(--color-background-default)',
        'background-subtle': 'var(--color-background-subtle)',
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
