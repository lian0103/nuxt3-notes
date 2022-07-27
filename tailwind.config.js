const colors = require('tailwindcss/colors');

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.violet[700],
          ...colors.violet,
        },
      },
      fontFamily: {
        sans: ['Inter'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
