const plugin = require('tailwindcss/plugin');

const { prefixByBrand, PRIMARY, SECONDARY, TERTIARY, GHOST } = require('../constant');
const { generateBtnVariable } = require('../helper/btnVariable');
const { combineVars } = require('../helper/variables');

/**
 *
 * @param {string} name
 * @param {string} prefix
 * @returns
 */
function createStyle(name, prefix) {
  const variable = generateBtnVariable(name, prefix);

  return {
    [`&-${name}`]: {
      backgroundColor: combineVars(variable[name]),
      color: combineVars(variable[name + '-content']),
      borderColor: combineVars(variable[name + '-border']),

      '&:active': {
        backgroundColor: combineVars(variable[name + '-active'], variable[name + '-hover'], variable[name])
      }
    },
    [`&-${name}:hover:where(:not([disabled])),&-${name}.btn-active:where(:not([disabled]))`]: {
      backgroundColor: combineVars(variable[name + '-hover'], variable[name]),
      color: combineVars(variable[name + '-content-hover']),
      borderColor: combineVars(variable[name + '-border-hover'], variable[name])
    },
    [`.btn-outline&-${name}`]: {
      color: combineVars(variable[name]),
      backgroundColor: 'transparent',
      '&:hover:where(:not([disabled]))': {
        color: combineVars(variable[name + '-content']),
        backgroundColor: combineVars(variable[name + '-hover']),
        borderColor: combineVars(variable[name + '-border'], variable[name])
      }
    }
  };
}
/** @typedef {import('./types').Config['itel']} Config */

const button = plugin(function ({ addComponents, theme, addUtilities, config, ...rest }) {
  // Button
  addComponents({
    '.btn': {
      '-TwBorderOpacity': '1',
      display: 'inline-flex',
      flexShink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: theme('fontSize.base.0'),
      lineHeight: theme('fontSize.base.1'),
      fontWeight: theme('fontWeight.bold'),
      userSelect: 'none',
      border: '1px solid transparent',
      borderRadius: '0.5rem',
      padding: '0 1rem',
      height: '3rem',
      borderWidth: 1,
      '-TwBorderOpacity': '1',
      backgroundColor: `rgba(${combineVars('--n')})`,
      color: `rgba(${combineVars('--nc')})`,

      // height: theme('height.12'),
      // '&:hover:where(:not([disabled]))': {
      //   backgroundColor: `rgba(${combineVars('--nf')})`
      // },
      // '&-primary': {
      //   backgroundColor: theme('colors.red.500'),
      //   color: theme('colors.neutral-0'),
      //   borderColor: theme('colors.red.500'),

      //   // '&:active': {
      //   // backgroundColor: combineVars(variable[name + '-active'], variable[name + '-hover'], variable[name])
      //   // },
      //   '&:active:where(:not([disabled])),&:hover:where(:not([disabled])),&.btn-active:where(:not([disabled]))': {
      //     backgroundColor: theme('colors.red.600')
      //     // color: combineVars(variable[name + '-content-hover']),
      //     // borderColor: combineVars(variable[name + '-border-hover'], variable[name])
      //   },
      //   '.btn-outline&': {
      //     color: theme('colors.red.500'),
      //     backgroundColor: 'transparent',
      //     '&:hover:where(:not([disabled]))': {
      //       color: theme('colors.neutral-0'),
      //       backgroundColor: theme('colors.red.500'),
      //       borderColor: theme('colors.red.500')
      //     }
      //   }
      // },

      // // Styles
      ...createStyle(PRIMARY, prefixByBrand[PRIMARY]),
      ...createStyle(SECONDARY, prefixByBrand[SECONDARY]),
      ...createStyle(TERTIARY, prefixByBrand[TERTIARY]),
      '&-ghost': {
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: 'currentColor',
        '&:hover:where(:not([disabled])), &.btn-active:where(:not([disabled]))': {
          color: 'var(--gch)',
          backgroundColor: `var(--gh)`
        }
      },

      '&-filter': {
        backgroundColor: 'transparent',
        color: 'var(--filter-color, inherit)',
        borderColor: 'var(--filter-border)',
        '&:hover:not([disabled]), &.btn-active': {
          color: 'var(--filter-color-active)',
          borderColor: 'var(--filter-border-active)',
          backgroundColor: 'var(--filter-bg-active)'
        }
      },

      // Sizes
      '&-xs': {
        fontSize: theme('fontSize.xs.0'),
        lineHeight: theme('fontSize.xs.1'),
        height: '2rem',
        padding: '0 0.75ren'
      },
      '&-sm': {
        fontSize: theme('fontSize.sm.0'),
        lineHeight: theme('fontSize.sm.1'),
        height: '2.5rem',
        padding: '0 1rem'
      },
      '&-md': {
        fontSize: theme('fontSize.base.0'),
        lineHeight: theme('fontSize.base.1'),
        height: '3rem',
        padding: '0 1rem'
      },
      '&-lg': {
        fontSize: theme('fontSize.base.0'),
        lineHeight: theme('fontSize.base.1'),
        height: '3.5rem',
        padding: '0 1.5rem'
      },
      '&[disabled], .btn-disabled': {
        opacity: 0.3
      },

      '&-outline': {
        borderColor: 'currentColor',
        backgroundColor: 'transparent',
        '--tw-text-opacity': '1',
        color: 'rgba(var(--bc)/var(--tw-text-opacity))',
        '&:hover,&.btn-active': {
          '-TwBorderOpacity': '1',
          borderColor: 'rgba(var(--bc) / var(--tw-border-opacity))',
          '-TwBgOpacity': '1',
          backgroundColor: 'rgba(var(--bc) / var(--tw-bg-opacity))',
          '-TwTextOpacity': '1',
          color: 'rgba(var(--b1) / var(--tw-text-opacity))'
        }
      },
      '&.loading:before': {
        content: '""',
        marginRight: '.5rem',
        height: '1rem',
        width: '1rem',
        borderRadius: '9999px',
        borderWidth: '2px',
        animation: 'spin 2s linear infinite',
        content: '',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: 'currentColor',
        borderRightColor: 'currentColor'
      },
      '&.loading': {
        '&:before': {
          content: '""'
        },
        '&.btn-square:before': {
          marginRight: 0
        }
      },

      /** Modifier */
      '&-square': {
        width: '3rem',
        height: '3rem',
        padding: '0',
        '&:where(.btn-xs)': {
          height: '2rem',
          width: '2rem',
          padding: '0'
        },
        '&:where(.btn-sm)': {
          height: '2.5rem',
          width: '2.5rem',
          padding: '0'
        },
        '&:where(.btn-md)': {
          height: '3rem',
          width: '3rem',
          padding: '0'
        },
        '&:where(.btn-lg)': {
          height: '3.5rem',
          width: '3.5rem',
          padding: '0'
        }
      },
      '&-circle': {
        borderRadius: '9999px',
        padding: 0,
        height: '3rem',
        width: '3rem',
        '&:where(.btn-xs)': {
          height: '2rem',
          width: '2rem',
          padding: '0'
        },
        '&:where(.btn-sm)': {
          height: '2.5rem',
          width: '2.5rem',
          padding: '0'
        },
        '&:where(.btn-md)': {
          height: '3rem',
          width: '3rem',
          padding: '0'
        },
        '&:where(.btn-lg)': {
          height: '3.5rem',
          width: '3.5rem',
          padding: '0'
        }
      }
    }
  });
});

module.exports = button;
