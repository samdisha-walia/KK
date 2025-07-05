/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
        beige: "#f5f5dc",
        bisque:'#ffe4c4' ,
        black: "#000000",
        white: "#ffffff",
        antiqueWhite: "#faebd7",
        blanchedalmond: "#ffebcd",
        chocolate: "#d2691e",
        burlywood: "#deb887",
        cornsilk: "#fff8dc",
        darkGoldenrod: "#b8860b",
        darkkhaki: "#bdb76b",
        darksalmon: "#e9967a",
        gold:'#ffd700',
        moccasin: "#ffe4b5",
        navajoWhite: "#ffdead",
        peru: "#cd853f",
        saddlebrown: "#8b4513",
        sandybrown: "#f4a460",
        sienna : "#a0522d",
        tan: "#d2b48c",
        wheat : "#f5deb3",
      },
    },
  },
  plugins: [],
}
