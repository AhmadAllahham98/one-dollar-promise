/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        accent2: "var(--color-accent2)",
        surface: {
          100: "var(--color-surface-100)",
          200: "var(--color-surface-200)",
          white: "var(--color-surface-white)",
        },
        content: {
          base: "var(--color-content-base)",
          inverse: "var(--color-content-inverse)",
        },
      },
      spacing: {
        xsm: "var(--spacing-xsm)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xlg: "var(--spacing-xlg)",
        "mobile-gap": "var(--grid-mobile-gap)",
        "desktop-gap": "var(--grid-desktop-gap)",
        "page-pt-desktop": "var(--page-pt-desktop)",
        "page-px-desktop": "var(--page-px-desktop)",
        "page-pt-mobile": "var(--page-pt-mobile)",
        "page-px-mobile": "var(--page-px-mobile)",
        "grid-margin-desktop": "var(--grid-desktop-margin)",
        "grid-margin-mobile": "var(--grid-mobile-margin)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        lg: "var(--radius-lg)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        interface: ["var(--font-interface)", "sans-serif"],
      },
      boxShadow: {
        main: "0px 0px 16px 0px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        "promise-float": {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.8)",
          },
          "2.5%": {
            // 0.5s of 20s cycle
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
          "17.5%": {
            // 3.5s total (3s stay)
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
          "20%, 100%": {
            // 4.0s total (0.5s fade out)
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.8)",
          },
        },
      },
      animation: {
        "promise-float": "promise-float 20s linear infinite backwards",
      },
    },
  },
  plugins: [],
};
