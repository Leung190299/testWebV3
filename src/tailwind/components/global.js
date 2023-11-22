const plugin = require('tailwindcss/plugin');

const global = plugin(function ({ addComponents, theme, addUtilities, addBase }) {
  const xl = (css) => ({
    [`@media (min-width: ${theme('screens.xl', {})})`]: css
  });
  const md = (css) => ({
    [`@media (min-width: ${theme('screens.md', {})})`]: css
  });
  // aspectRatio: {
  //   cinema: '2 / 1',
  //   'cinema-veritcal': '1 / 2',
  //   'video-vertical': '9 / 16',
  //   video: '16 / 9',
  //   tivi: '4 / 3',
  //   'tivi-vertical': '3 / 4',
  //   photo: '3 / 2',
  //   'photo-vertical': '2 / 3',
  //   'section-banner': '3 / 1'
  // },
  addComponents({
    '.block-img': { position: 'relative', zIndex: 0, '> img': { position: 'absolute', inset: '0', height: '100%', width: '100%' } },
    '.block-square': { paddingBottom: '100%' },
    '.block-cinema': { paddingBottom: '50%' },
    '.block-cinema-vertical': { paddingBottom: '200%' },
    '.block-video': { paddingBottom: '56.25%' },
    '.block-video-vertical': { paddingBottom: '177.78%' },
    '.block-tivi': { paddingBottom: '75%' },
    '.block-tivi-vertical': { paddingBottom: '133.33%' },
    '.block-photo': { paddingBottom: '66.67%' },
    '.block-photo-vertical': { paddingBottom: '150%' },
    '.block-banner': { paddingBottom: '33.33%' }
  });

  addComponents({
    '.list': {},
    '.list-item': {},
    '.list-menu': {}
  });
  addComponents({
    '.banner': {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '1rem',
      ...xl({
        rowGap: '1.5rem'
      })
    },
    '.banner-title': {
      fontSize: theme('fontSize.md.0'),
      lineHeight: theme('fontSize.md.1'),
      fontWeight: '700',
      ...xl({
        fontSize: theme('fontSize.lg.0'),
        lineHeight: theme('fontSize.lg.1')
      }),
      transition: 'color .3s ease'
    }
  });

  // Using grid to center element not work if content doesn't have height
  addUtilities({
    '.center-by-grid': {
      display: 'grid',
      placeItems: 'center',
      '> *': {
        gridColumn: '1 / -1',
        gridRow: '1 / -1'
      }
    }
  });
  addBase({
    '.transition-default': {
      transition: 'all .4s ease'
    }
  });

  // Scroll bar hide
  addUtilities(
    {
      '.scrollbar-hide': {
        /* IE and Edge */
        MsOverflowStyle: 'none',

        /* Firefox */
        scrollbarWidth: 'none',

        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'none',
          WebkitAppearance: 'none',
          width: '0',
          height: '0'
        }
      },

      '.scrollbar-default': {
        /* IE and Edge */
        '-ms-overflow-style': 'auto',

        /* Firefox */
        'scrollbar-width': 'auto',

        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'block'
        }
      }
    },
    ['responsive']
  );

  // Support
  addComponents({
    '.support': {
      display: 'flex',
      padding: '1rem',
      gap: '1rem',
      alignItems: 'center',
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1'),
      backgroundColor: theme('colors.neutral-0'),
      borderRadius: '0.5rem',
      color: theme('colors.neutral-800'),
      fontWeight: theme('fontWeight.semibold'),
      '&:hover': {
        backgroundColor: theme('colors.red.500'),
        color: theme('colors.neutral-0')
      },
      ...xl({
        borderRadius: '1rem',
        padding: '1.5rem',
        fontSize: theme('fontSize.lg.0'),
        lineHeight: theme('fontSize.lg.1'),
        fontWeight: theme('fontWeight.bold')
      })
    }
  });

  // breadcrumbs
  addComponents({
    '.breadcrumbs': {
      maxWidth: '100%',
      padding: '1rem 0',
      fontWeight: '500',
      '> ul, > ol': {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        '> li': {
          display: 'flex',
          alignItems: 'center',
          '+ ::before': {
            // content: "url('/icons/line/chevron-right.svg')",
            content: "''",
            backgroundImage: "url('/icons/line/chevron-right.svg')",
            backgroundSize: '100%',

            marginLeft: '.25rem',
            marginRight: '.25rem',
            display: 'block',
            height: '1rem',
            width: '1rem',
            backgroundColor: 'transparent',
            flexShrink: '0',
            ...md({
              marginLeft: '.5rem',
              marginRight: '.5rem',
              height: '1.5rem',
              width: '1.5rem'
            })
          }
        }
      }
    }
  });

  // progress
  addComponents({
    '.progress': {}
  });

  addComponents({
    '.label': {
      display: 'flex',
      WebkitUserSelect: 'none',
      userSelect: 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    '.label-text[aria-required="true"]::after': {
      content: '"*"',
      color: theme('colors.red.500'),
      marginLeft: 2
    },
    '.label-text': {
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1'),
      '-TwTextOpacity': '1',
      color: 'rgba(var(--bc)/var(--tw-text-opacity))'
    },
    '.label-text-alt': {
      fontSize: theme('fontSize.xs.0'),
      lineHeight: theme('fontSize.xs.1'),
      '-TwTextOpacity': '1',
      color: 'rgba(var(--bc)/var(--tw-text-opacity))'
    },
    '.form-control': { display: 'flex', flexDirection: 'column' },

    '.input': {
      flexShrink: 1,
      padding: '1rem',
      fontSize: theme('fontSize.base.0'),
      lineHeight: '2',
      lineHeight: theme('fontSize.base.1'),
      borderWidth: 1,
      borderColor: 'rgba(var(--bc)/var(--tw-border-opacity))',
      '-TwBorderOpacity': '1',
      '-TwBgOpacity': '1',
      backgroundColor: 'rgba(var(--b1)/var(--tw-bg-opacity))',
      borderRadius: '.5rem'
    },

    '.input:disabled': {
      color: theme('colors.neutral-300'),
      cursor: 'not-allowed'
    },
    '.input-bordered': {
      borderColor: theme('colors.neutral-300'),
      '&:hover:not([disabled]),&:focus:not([disabled]),&:focus-within:not([disabled])': {
        borderColor: theme('colors.neutral-800')
      }
    },

    // input-group
    '.input-group': {
      display: 'flex',
      alignItems: 'stretch',
      position: 'relative',
      '> *': { borderRadius: '0', borderRightWidth: '0', borderLeftWidth: '0' },
      '> :first-child': { borderTopLeftRadius: 'inherit', borderBottomLeftRadius: 'inherit', borderLeftWidth: 1 },
      '> :last-child': { borderTopRightRadius: 'inherit', borderBottomRightRadius: 'inherit', borderRightWidth: 1 }
    },

    '.input:invalid,.input-error': {
      borderColor: theme('colors.red.500')
    },

    // Input with leading or trailing icon
    '.leading-icon': {
      paddingLeft: '0.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    '.input-leading-icon :where(.input)': {
      paddingLeft: '3rem',
      width: '100%'
    },
    '.input-trailing-icon :where(.input)': {
      paddingRight: '3rem',
      width: '100%'
    },
    '.trailing-icon': {
      right: '0px',
      paddingRight: '0.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    '.input:placeholder-shown ~ .input-clear': {
      opacity: 0
    },

    // Styles
    '.input-addons-trailing': {},

    // Utilities
    '.input-lg': { padding: '1.25rem 1.5rem' }

    // '.checkbox': {}
  });

  addComponents({
    '.single-select': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '0.5rem',
      height: '2.25rem',
      border: '1px solid transparent',
      borderColor: theme('colors.neutral-500')
    }
  });
});

module.exports = global;
