const plugin = require('tailwindcss/plugin');
const Color = require('color');

const card = plugin(function ({ addComponents, addBase, addUtilities, theme }) {
  const xl = (css) => ({
    [`@media (min-width: ${theme('screens.xl', {})})`]: css
  });
  const md = (css) => ({
    [`@media (min-width: ${theme('screens.md', {})})`]: css
  });
  addComponents({
    '.card': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '1rem',
      ':where(figure:first-child)': {
        overflow: 'hidden',
        borderStartStartRadius: 'inherit',
        borderStartEndRadius: 'inherit',
        borderEndStartRadius: 'unset',
        borderEndEndRadius: 'unset'
      }
    },
    '.card-image': {},
    '.card-hover': {
      transition: 'opacity .4s ease',
      opacity: '0'
    },
    '.card:hover .card-hover': {
      opacity: '1'
    },
    '.card-side': {},
    '.card-body': {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      padding: '1rem 1.5rem'
      // gap: '1rem'
    },
    '.card-actions': {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: '0.5rem'
    },
    '.card-title': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: theme('fontSize.md.0'),
      lineHeight: theme('fontSize.md.1'),
      fontWeight: '500',
      display: '-webkit-box',
      '-webkit-line-clamp': '2',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden'
    },
    '.card-desc': {
      color: theme('colors.neutral-500'),
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1')
    },
    '.card-tags': {
      display: 'flex',
      gap: '0.5rem'
    },
    '.card-divider': {
      mask: [
        'radial-gradient(circle var(--size) at left,#0000 98%,#000) top left',
        'radial-gradient(circle var(--size) at right,#0000 98%,#000) top right'
      ].join(','),
      maskSize: '50% 100%',
      maskRepeat: 'no-repeat',
      '&:before': {
        display: 'block',
        content: '""',
        height: 1,
        '-DashColor': theme('colors.neutral-200'),
        backgroundImage: 'repeating-linear-gradient( to right, transparent, transparent 3px, var(--dash-color) 3px, var(--dash-color) 6px)'
      },
      padding: '0.375rem 0.625rem',
      '-Size': 4,
      ...md({
        '-Size': 10,
        padding: '0.875rem 0.875rem'
      })
    },
    '.card-actions-ticket': {
      display: 'flex',
      padding: '0 1rem 1rem',
      borderEndStartRadius: 'inherit',
      borderEndEndRadius: 'inherit',
      gap: '0.75rem'
    },
    '.card-feature': {
      transition: 'color .3s ease',
      padding: '.5rem',
      ...md({
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem'
      }),
      ...xl({
        padding: '3.5rem 1.5rem'
      }),
      '&-overlay': {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        transition: 'opacity .3s ease',
        opacity: 0,
        backgroundColor: theme('colors.red.500')
      },
      // hover:text-neutral-0 hover:bg-red-500 transition-all duration-300  group

      '&:hover': {
        color: theme('colors.neutral-0'),
        '.card-feature-overlay': {
          opacity: 1
        }
      }
    },

    // utilities
    '.card-active': {
      '&.card-feature': {
        color: theme('colors.neutral-0'),
        '.card-feature-overlay': {
          opacity: 1
        }
      },
      '.card-desc': {
        color: theme('colors.neutral-0')
      }
    },
    '.card-desc': {
      color: theme('colors.neutral-500')
    },

    '.card-lg': {}
  });
  addComponents({
    '.card-side': {
      alignItems: 'stretch',
      flexDirection: 'row',
      ':where(figure:first-child)': {
        borderStartStartRadius: 'inherit',
        borderStartEndRadius: 'unset',
        borderEndStartRadius: 'inherit',
        borderEndEndRadius: 'unset'
      }
    }
  });
});

module.exports = card;
