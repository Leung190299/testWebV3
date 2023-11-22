const plugin = require('tailwindcss/plugin');

const price = plugin(function ({ addComponents, theme, addUtilities }) {
  const xl = (css) => ({
    [`@media (min-width: ${theme('screens.xl', {})})`]: css
  });
  const md = (css) => ({
    [`@media (min-width: ${theme('screens.md', {})})`]: css
  });

  addComponents({
    '.price-info': {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'flex-start',
      ...xl({
        alignItems: 'center'
      })
    },
    '.price': {
      display: 'inline-flex',
      flexDirection: 'column',
      color: theme('colors.neutral-700'),
      fontWeight: '500',
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1'),
      ...md({
        fontSize: theme('fontSize.base.0'),
        lineHeight: theme('fontSize.base.1')
      }),
      ...xl({
        display: 'inline-block'
      })
    },
    // '.price-flash-sale': {
    //   fontSize: theme('fontSize.lg.0'),
    //   lineHeight: theme('fontSize.lg.1')
    // },
    '.price-discount': {
      display: 'inline-block',
      fontWeight: '400',
      color: theme('colors.neutral-500'),
      textDecoration: 'line-through',
      fontSize: theme('fontSize.xs.0'),
      lineHeight: theme('fontSize.xs.1'),
      ...xl({
        fontSize: theme('fontSize.sm.0'),
        lineHeight: theme('fontSize.sm.1')
      })
    },
    '.price-sm': {
      fontSize: theme('fontSize.base.0'),
      lineHeight: theme('fontSize.base.1')
    },
    '.price-lg': {
      fontSize: theme('fontSize.md.0'),
      lineHeight: theme('fontSize.md.1')
    }
  });
});

module.exports = price;
