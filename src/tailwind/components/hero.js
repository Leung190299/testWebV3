const plugin = require('tailwindcss/plugin');
const hero = plugin(function ({ addBase, addComponents, theme }) {
  addComponents({
    '.hero': {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '.hero-bg': { width: '100%', height: '100%', '& > img': { objectFit: 'cover' } },
    '.hero-content': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '80rem'
    }
  });
});
module.exports = hero;
