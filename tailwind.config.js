/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      "2.5xs": "10px",
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
        "primary-blue-200": "#9aaac2",
        "primary-blue-500": "#365585",

      },
      backgroundImage: {
        "hero-ramen": "url('/image 1.png')",
        ramen: "url('/ramen.png')",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shine: "shine 1s infinite",
      },
    },
    variants: {
      extend: {
        animation: ["hover"],
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          ".fade-right": {
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: "0",
              right: "0",
              width: "50%",
              height: "100%",
              background: "linear-gradient(to left, white, transparent)",
            },
          },
        };
        addUtilities(newUtilities, ["responsive", "hover"]);
      },
    ],
  }
 
};
