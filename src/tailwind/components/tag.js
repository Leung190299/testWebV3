const plugin = require('tailwindcss/plugin');

const tag = plugin(function ({ addComponents, theme, addUtilities }) {
  addComponents({
    '.tag,.chip': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transitionProperty:
        'color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter',
      transitionProperty:
        'color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter',
      transitionProperty:
        'color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter',
      transitionDuration: '.2s',
      transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
      height: '1.75rem',
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1'),
      fontWeight: '500',
      width: '-moz-fit-content',
      width: 'fit-content',
      padding: '0 .5rem',
      borderWidth: '1px',
      '-TwBorderOpacity': '1',
      borderColor: 'rgba(var(--n)/var(--tw-border-opacity))',
      '-TwBgOpacity': '1',
      backgroundColor: 'rgba(var(--n)/var(--tw-bg-opacity))',
      '-TwTextOpacity': '1',
      color: 'rgba(var(--nc)/var(--tw-text-opacity))',
      borderRadius: '1.5rem'
    },

    /** Size */
    '.tag-sm': {
      height: '1.5rem',
      fontSize: theme('fontSize.xs.0'),
      lineHeight: theme('fontSize.xs.1'),
      padding: '0 .5rem'
    },
    '.tag-md': {
      height: '1.75rem',
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1'),
      padding: '0 .75rem'
    },

    /** styles */
    '.tag-primary': {
      color: theme('colors.red.500'),
      backgroundColor: theme('colors.red.100'),
      borderColor: theme('colors.red.100')
    },
    '.tag-secondary': {
      color: theme('colors.neutral-500'),
      backgroundColor: theme('colors.neutral-100'),
      borderColor: theme('colors.neutral-100')
    },

    // Extra type
    '.tag-vector,.tag-vector-1': {
      border: 'none',
      borderRadius: 'unset',
      maskRepeat: 'no-repeat',
      maskSize: 'auto 100%'
    },
    '.tag-vector': {
      maskPosition: 'right',
      maskImage: 'url(/images/mask-tag.svg)'
    },
    '.tag-vector-1': {
      maskPosition: 'left',
      maskImage: 'url(/images/mask-tag-1.svg)'
    },

    // Timer tag
    '.tag-sale': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme('colors.neutral-0'),
      backgroundColor: theme('colors.red.500'),
      borderColor: theme('colors.red.500'),
      height: 'initial',
      padding: '0.5rem 1rem',
      gap: '0.5rem',
      fontWeight: '700',
      fontSize: theme('fontSize.base.0'),
      lineHeight: theme('fontSize.base.1'),
      '.tag-xs&': {
        height: 'initial',
        fontSize: theme('fontSize.xs.0'),
        lineHeight: theme('fontSize.xs.1'),
        gap: '0.25rem',
        padding: '0.25rem 0.375rem'
      },
      '.tag-sm&': {
        height: 'initial',
        fontSize: theme('fontSize.sm.0'),
        lineHeight: theme('fontSize.sm.1'),
        gap: '0.375rem',
        padding: '0.25rem 0.75rem'
      },
      '.tag-md&,.tag-base:where(&)': {
        height: 'initial',
        fontSize: theme('fontSize.sm.0'),
        lineHeight: theme('fontSize.sm.1'),
        gap: '0.5rem',
        padding: '0.5rem 1rem'
      },
      '.tag-lg:where(&)': {
        height: 'initial',
        fontSize: theme('fontSize.base.0'),
        lineHeight: theme('fontSize.base.1'),
        gap: '1rem',
        padding: '0.5rem 1.5rem'
      }
    },
    //
    '.tag-sale-icon': {
      height: '2rem',
      width: '4rem',
      '.tag-xs &': { height: '1.25rem', width: '2.5rem' },
      '.tag-sm &': { height: '1.5rem', width: '3rem' },
      '.tag-md &': { height: '2rem', width: '4rem' },
      '.tag-lg &': { height: '2.5rem', width: '5rem' }
    },
    '.tag-sale-time': {
      display: 'flex',
      gap: '0.25rem',
      alignItems: 'center',
      '> span': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        backgroundColor: theme('colors.neutral-0'),
        color: theme('colors.orange'),
        borderRadius: '0.25rem'
      },
      '.tag-xs &': { gap: '0.125rem', '> span': { width: '1.25rem', height: '1.25rem' } },
      '.tag-sm &': { gap: '0.25rem', '> span': { width: '1.5rem', height: '1.5rem' } },
      '.tag-base &': { gap: '0.25rem', '> span': { width: '1.75rem', height: '1.75rem' } },
      '.tag-md &': { gap: '0.25rem', '> span': { width: '2rem', height: '2rem' } },
      '.tag-lg &': { gap: '0.25rem', '> span': { width: '2.4375rem', height: '2.25rem' } }
    },

    //
    '.tag-sim': {
      color: theme('colors.neutral-0'),
      height: '1.5rem'
    },
    '.tag-sim-list': {
      color: theme('colors.red.500'),
      backgroundColor: theme('colors.red.100'),
      height: '1.5rem'
    },

    '.tag-outline,.chip-outline': {
      borderColor: 'currentColor',
      '-TwBorderOpacity': '0.5',
      backgroundColor: 'transparent',
      color: 'currentColor'
    }
  });
  addComponents({
    '.badge': {
      backgroundColor: theme('colors.orange'),
      color: theme('colors.neutral-0'),

      display: 'inline-flex',
      placeItems: 'center',
      justifyContent: 'center',
      alignItems: 'center',

      fontSize: theme('fontSize.xs.0'),
      lineHeight: theme('fontSize.xs.1'),
      fontWeight: '700',
      borderRadius: '0.25rem',
      // size,
      '&-sm': {
        fontSize: '0.625rem',
        lineHeight: '1rem'
      },
      '&-md': {
        fontSize: theme('fontSize.xs.0'),
        lineHeight: theme('fontSize.xs.1')
      },
      '&-lg': {
        fontSize: theme('fontSize.sm.0'),
        lineHeight: theme('fontSize.sm.1')
      }
    },
    '.badge-sale': {
      backgroundColor: theme('colors.red.500'),
      padding: '0.125rem 0.25rem',
      fontWeight: '500'
    },

    '.badge-center': {
      width: 'auto',
      display: 'grid',
      placeItems: 'center',
      justifyContent: 'normal',
      '> *': {
        gridColumn: '1 / -1',
        gridRow: '1 / -1'
      },
      '&:before': {
        content: "''",
        paddingBottom: '100%',
        width: '100%',
        gridColumn: '1 / -1',
        gridRow: '1 / -1'
      }
    }
  });

  addComponents({
    '.chip': {
      height: '2.5rem',
      padding: '0 1rem'
    }
  });
});

module.exports = tag;
