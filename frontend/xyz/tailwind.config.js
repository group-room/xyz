/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#B9D7FF",
        pink: "#F39FBF",
        yellow: "#FFE695",
        retro: "#F9F0EA",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(180deg)" },
        },
        "fade-in-transform": {
          from: { opacity: 0.2, transform: "translate(0px, 0px)" },
          to: { opacity: 1, transform: "translate(-40px, 50px)" },
        },
      },
      animation: {
        "spin-slow": "spin 1s linear",
        "fade-in-transform": "fade-in-transform 1.5s ease-in-out",
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
