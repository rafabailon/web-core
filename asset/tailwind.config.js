const THEME = require('./theme');

module.exports = {
  content: [
    "../../component/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        ...THEME.theme_colors,
        ...THEME.system_colors
      },
      fontFamily: {
        ...THEME.font_family
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
