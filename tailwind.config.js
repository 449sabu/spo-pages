/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        "scale-in-tl": "scale-in-tl 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "tracking-in-expand": "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both"
    },
    keyframes: {
        "scale-in-tl": {
            "0%": {
                transform: "scale(0)",
                "transform-origin": "0% 0%",
                opacity: "1"
            },
            to: {
                transform: "scale(1)",
                "transform-origin": "0% 0%",
                opacity: "1"
            }
        },
        "tracking-in-expand": {
          "0%": {
              "letter-spacing": "-.5em",
              opacity: "0"
          },
          "40%": {
              opacity: ".6"
          },
          to: {
              opacity: "1"
          }
      }
    }
    },
    patterns: {
      opacities: {
          100: "1",
          80: ".80",
          60: ".60",
          40: ".40",
          20: ".20",
          10: ".10",
          5: ".05",
      },
      sizes: {
          1: "0.25rem",
          2: "0.5rem",
          4: "1rem",
          6: "1.5rem",
          8: "2rem",
          16: "4rem",
          20: "5rem",
          24: "6rem",
          32: "8rem",
      }
  }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-bg-patterns'),
  ],
}
