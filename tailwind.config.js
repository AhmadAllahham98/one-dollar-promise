/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        accent2: 'var(--color-accent2)',
        surface: {
          100: 'var(--color-surface-100)',
          200: 'var(--color-surface-200)',
        },
        text: {
          primary: 'var(--color-text-primary)',
        },
      },
      spacing: {
        xsm: 'var(--spacing-xsm)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xlg: 'var(--spacing-xlg)',
        'mobile-gap': 'var(--grid-mobile-gap)',
        'desktop-gap': 'var(--grid-desktop-gap)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        interface: ['var(--font-interface)', 'sans-serif'],
      },
      boxShadow: {
        main: '0px 0px 16px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
