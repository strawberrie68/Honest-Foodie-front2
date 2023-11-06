/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xxxs: "0.5rem",
      xxs: "0.75rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
        xxs: "350px",
      },
      colors: {
        "primary-gray-50": "#F0F0F0",
        "primary-gray-100": "#F3F3F3",
        "primary-gray-200": "#A7A7A7",
        "primary-gray-300": "#A3A3A3",
        "primary-gray-500": "#9E9E9E",
      },
      backgroundImage: {
        "hero-ramen": "url('/image 1.png')",
        ramen: "url('/ramen.png')",
      },
    },
    plugins: [],
  },
};
