/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-50": "#eff6ff",
        "primary-100": "#dbeafe",
        "primary-200": "#bfdbfe",
        "primary-300": "#93c5fd",
        "primary-400": "#60a5fa",
        "primary-500": "#1d4ed8",
        "primary-600": "#1e40af",
        "primary-700": "#1e3a8a",
        "primary-800": "#1e3a8a",
        "primary-900": "#172554",

        "emerald-50": "#ecfdf5",
        "emerald-100": "#d1fae5",
        "emerald-200": "#a7f3d0",
        "emerald-300": "#6ee7b7",
        "emerald-400": "#34d399",
        "emerald-500": "#10b981",
        "emerald-600": "#059669",
        "emerald-700": "#047857",
        "emerald-800": "#065f46",
        "emerald-900": "#064e3b",

        "surface": "#ffffff",
        "surface-dim": "#f8fafc",
        "surface-bright": "#f1f5f9",
        "surface-dark": "#0f172a",
        "surface-dark-dim": "#1e293b",
        "surface-dark-bright": "#334155",

        "text-primary": "#0f172a",
        "text-secondary": "#475569",
        "text-muted": "#94a3b8",
        "text-dark-primary": "#f8fafc",
        "text-dark-secondary": "#cbd5e1",
        "text-dark-muted": "#64748b",

        "border-light": "#e2e8f0",
        "border-dark": "#334155",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
        elevated: "0 20px 50px -12px rgba(0, 0, 0, 0.12)",
        glass: "0 8px 32px 0 rgba(14, 165, 233, 0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        gradient: "gradient-shift 8s ease infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
