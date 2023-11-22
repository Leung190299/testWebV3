const plugin = require('tailwindcss/plugin');

const profile = plugin(function ({ addComponents, theme, addUtilities, addVariant }) {
  addComponents({
    '.active-router': {
      '.menu-icon': {
        backgroundColor: theme('colors.neutral-100'),
        color: theme('colors.red.500')
      }
    },
    '.menu-left': {
      [':where(li:not(.menu-title):not(:empty))>:where(*:not(ul):focus),' +
      '& :where(li:not(.menu-title):not(:empty))>:where(*:not(ul):hover),' +
      '& :where(li:is(.menu-active):not(:empty))>:where(*:not(ul))']: {
        backgroundColor: theme('colors.base-100'),
        '& .menu-icon': {
          color: theme('colors.red.500')
        },
        '& .menu-icon-arrow': {
          transform: 'none',
          opacity: '1'
        }
      }
    }
  });
});

module.exports = profile;
