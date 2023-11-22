const plugin = require('tailwindcss/plugin');

const menu = plugin(function ({ addComponents, theme, addUtilities, addVariant }) {
  addComponents({
    '.menu': {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      // Where list item exclude `.menu-title` and `ul`
      ':where(li:not(.menu-title))>:where(*:not(ul))': {
        display: 'flex'
      },
      ':where(li:empty)': {
        margin: '.5rem 0',
        height: 1,
        backgroundColor: 'rgba(var(--bc)/0.1)'
      },

      // Where list item exclude `.menu-title` and `ul` that not disabled
      ':where(li:not(.disabled):not(.menu-title))>:where(*:not(ul))': {
        cursor: 'pointer',
        webkitUserSelect: 'none',
        userSelect: 'none',
        alignItems: 'center',
        outline: '2px solid transparent',
        outlineOffset: '2px'
      },

      // This style can be overwrited by utilities
      ':where(li) > :where(:not(ul))': {
        gap: '.75rem',
        padding: '1rem',
        color: 'currentColor'
      },
      [':where(li:not(.menu-title):not(:empty))>:where(*:not(ul):focus),' +
      '& :where(li:not(.menu-title):not(:empty))>:where(*:not(ul):hover),' +
      '& :where(li:is(.menu-active):not(:empty))>:where(*:not(ul))']: {
        backgroundColor: 'var(--menu-bg)',
        '& .menu-icon': {
          color: theme('colors.red.500')
        },
        '& .menu-icon-arrow': {
          transform: 'none',
          opacity: '1'
        }
      },
      ':where(li:is(.menu-title):not(:empty))>:where(*:not(ul))': {
        padding: 0
      },
      '&-title': {},
      '&-icon': {
        width: '2.5rem',
        height: '2.5rem',
        transition: 'all .3s ease',
        backgroundColor: theme('colors.neutral-100'),
        borderRadius: '0.5rem'
      },

      '&-icon-arrow': {
        opacity: '0',
        transform: 'translateX(-50%)',
        transition: 'all .5s ease'
      },

      '&-sub': {
        paddingLeft: '3.75rem',
        '&-item': {
          padding: '1.25rem 1rem'
        }
      },

      '&-border': {
        ':where(li:not(.disabled):not(.menu-title))>:where(*:not(ul))': {
          borderBottom: '1px solid ' + theme('colors.neutral-200')
        }
      }
    },
    ':where(.menu li)': {
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'stretch'
    }
  });
  addVariant('optional', '&:optional');
  addVariant('group-optional', ':merge(.group):optional &');
  addVariant('peer-optional', ':merge(.peer):optional ~ &');
  addVariant('menu-selected', ':merge(.menu-active) &');
});

module.exports = menu;
