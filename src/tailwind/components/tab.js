const { addRequestMeta } = require('next/dist/server/request-meta');
const plugin = require('tailwindcss/plugin');

const tab = plugin(function ({ addBase, addUtilities, addVariant, addComponents, theme }) {
  addComponents({
    '.tabs': {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1')
    },
    '.tab': {
      position: 'relative',
      display: 'inline-flex',
      cursor: 'pointer',
      userSelect: 'none',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',

      '-TwTextOpacity': '1',
      color: 'rgba(var(--stc) / var(--tw-text-opacity))',

      borderColor: 'rgba(var(--b3) / var(--tw-bg-opacity, 1))',
      padding: '0.5rem 1rem'
    },
    '.tab-icon': {
      color: theme('colors.red.500')
    },
    '.tab:hover': { '-TwTextOpacity': '1' },
    '.tab-bordered': {
      borderColor: 'rgba(var(--bc) / var(--tw-border-opacity))',
      '-TwBorderOpacity': '0.2',
      borderStyle: 'solid',
      borderBottomWidth: 'calc(var(--tab-border, 1px) + 1px)'
    },

    '.tab-lifted': {
      borderWidth: '0 0 var(--tab-border, 1px) 0',
      borderTopLeftRadius: 'var(--tab-radius, 0.5rem)',
      borderTopRightRadius: 'var(--tab-radius, 0.5rem)',
      paddingLeft: 'var(--tab-padding, 1rem)',
      paddingRight: 'var(--tab-padding, 1rem)',
      paddingTop: 'var(--tab-border, 1px)'
    },

    '.tab-sm': {
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1')
    },

    // styles
    '.tab-primary': {
      borderColor: 'transparent'
    }
  });

  addUtilities({
    '.tab.tab-active:not(.tab-disabled):not([disabled])': {
      '-TwBorderOpacity': '1',
      '-TwTextOpacity': '1',
      fontWeight: '700',
      color: 'rgba(var(--bc) / var(--tw-text-opacity))'
    },
    '.tab-primary.tab-active:not(.tab-disabled):not([disabled])': {
      borderColor: theme('colors.red.500')
    },
    '.tab-lifted.tab-active:not(.tab-disabled):not([disabled])': {
      // backgroundColor: 'var(--tab-bg)',
      borderWidth: 'var(--tab-border, 1px) var(--tab-border, 1px) 0 var(--tab-border, 1px)'
    }
  });
});
module.exports = tab;
