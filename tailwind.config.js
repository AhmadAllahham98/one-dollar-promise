/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:
          "color-mix(in srgb, var(--color-primary), transparent calc(100% - <alpha-value> * 100%))",
        accent:
          "color-mix(in srgb, var(--color-accent), transparent calc(100% - <alpha-value> * 100%))",
        accent2:
          "color-mix(in srgb, var(--color-accent2), transparent calc(100% - <alpha-value> * 100%))",
        surface: {
          100: "color-mix(in srgb, var(--color-surface-100), transparent calc(100% - <alpha-value> * 100%))",
          200: "color-mix(in srgb, var(--color-surface-200), transparent calc(100% - <alpha-value> * 100%))",
          white:
            "color-mix(in srgb, var(--color-surface-white), transparent calc(100% - <alpha-value> * 100%))",
        },
        content: {
          base: "color-mix(in srgb, var(--color-content-base), transparent calc(100% - <alpha-value> * 100%))",
          inverse:
            "color-mix(in srgb, var(--color-content-inverse), transparent calc(100% - <alpha-value> * 100%))",
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
