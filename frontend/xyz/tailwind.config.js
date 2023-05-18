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
          from: { opacity: 0.5, transform: "translate(0px, 0px)" },
          to: { opacity: 1, transform: "translate(-20%, 40%)" },
        },
      },
      animation: {
        "spin-slow": "spin 1s linear",
        "fade-in-transform": "fade-in-transform 1.5s forwards",
      },
      backgroundImage: (theme) => ({
        1: "url('/images/background/bg (1).png')",
        2: "url('/images/background/bg (2).png')",
        3: "url('/images/background/bg (3).png')",
        4: "url('/images/background/bg (4).png')",
        5: "url('/images/background/bg (5).png')",
        6: "url('/images/background/bg (6).png')",
        7: "url('/images/background/bg (7).png')",
        8: "url('/images/background/bg (8).png')",
        9: "url('/images/background/bg (9).png')",
      }),
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("daisyui")],
  daisyui: {
    // styled: false,
    themes: false,
  },
  safelist: [
    "bg-1",
    "bg-2",
    "bg-3",
    "bg-4",
    "bg-5",
    "bg-6",
    "bg-7",
    "bg-8",
    "bg-9",
  ],
};
