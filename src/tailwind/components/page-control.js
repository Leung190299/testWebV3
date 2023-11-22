const plugin = require('tailwindcss/plugin');
const Color = require('color');

const page_control = plugin(function ({ addComponents, addBase, addUtilities, theme }) {
  const xl = (css) => ({
    [`@media (min-width: ${theme('screens.xl', {})})`]: css
  });
  const md = (css) => ({
    [`@media (min-width: ${theme('screens.md', {})})`]: css
  });
  // Pagination
  addComponents({
    '.pag-ctrl': {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.75rem'
    },
    '.pag-bullet': {
      borderRadius: '50%',
      width: '0.5rem',
      height: '0.5rem',
      opacity: '0.3',
      backgroundColor: theme('colors.base-content'),
      '&.pag-active': {
        opacity: '1'
      },
    },
    '.pag-ctrl.pag-sm': {
      gap: '0.5rem',
      '.page-bullet': {
        width: '0.5rem',
        height: '0.5rem'
      }
    },
    '.pag-ctrl.pag-md': {
      gap: '0.75rem',
      '.page-bullet': {
        height: '0.625rem',
        height: '0.625rem'
      }
    }
  });
});

module.exports = page_control;
