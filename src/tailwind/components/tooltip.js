const plugin = require('tailwindcss/plugin');
const tooltip = plugin(function ({ addComponents, addUtilities, theme }) {
  // Tooltip
  addComponents({
    '.tooltip': {
      position: 'relative',
      '--tooltip-tail': '6px',
      '--tooltip-tail-offset': '1px',
      '--tooltip-offset': 'calc(100% + 1px + var(--tooltip-tail, 0px))'
    },
    '.tooltip-text': {
      position: 'absolute',
      zIndex: 1,
      maxWdith: '22.5rem',
      borderRadius: '.75rem',
      padding: '1rem',
      fontSize: theme('fontSize.sm.0'),
      lineHeight: theme('fontSize.sm.1'),
      backgroundColor: 'var(--tooltip-color)',
      color: 'var(--tooltip-text-color)',
      width: 'max-content'
    },
    [[
      '.tooltip.tooltip-open:before',
      '.tooltip.tooltip-open:after',
      '.tooltip:hover .tooltip-text',
      '.tooltip:hover .tooltip-text:after'
    ].join(',')]: {
      opacity: 1,
      transitionDelay: '75ms'
    },
    '.tooltip-text:after': {
      position: 'absolute',
      content: '""',
      borderStyle: 'solid',
      borderWidth: 'var(--tooltip-tail,0)',
      width: 0,
      height: 0,
      display: 'block'
    },
    '.tooltip-text,.tooltip-top': {
      transform: 'translate(-50%)',
      bottom: 'var(--tooltip-offset)',
      left: '50%',
      right: 'auto',
      top: 'auto',
      '&:after': {
        transform: 'translate(-50%)',
        borderColor: ' var(--tooltip-color) transparent transparent',

        top: 'calc(100% - var(--tooltip-tail-offset))',
        bottom: 'auto',
        left: '50%',
        right: 'auto'
      }
    },
    '.tooltip-bottom': {
      transform: 'translate(-50%)',
      top: 'var(--tooltip-offset)',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      '&:after': {
        transform: 'translate(-50%)',
        borderColor: 'transparent transparent var(--tooltip-color) transparent',

        bottom: 'calc(100% - var(--tooltip-tail-offset))',
        top: 'auto',
        left: '50%',
        right: 'auto'
      }
    },
    '.tooltip-left': {
      transform: 'translateY(-50%)',
      top: '50%',
      left: 'auto',
      right: 'var(--tooltip-offset)',
      bottom: 'auto',
      '&:after': {
        transform: 'translateY(-50%)',
        borderColor: 'transparent transparent transparent var(--tooltip-color)',
        bottom: 'auto',
        top: '50%',
        right: 'auto',
        left: 'calc(100% - var(--tooltip-tail-offset))'
      }
    },
    '.tooltip-right': {
      transform: 'translateY(-50%)',
      top: '50%',
      left: 'var(--tooltip-offset)',
      right: 'auto',
      bottom: 'auto',
      '&:after': {
        transform: 'translateY(-50%)',
        borderColor: 'transparent var(--tooltip-color) transparent transparent',
        top: '50%',
        right: 'calc(100% - var(--tooltip-tail-offset))',
        left: 'auto',
        bottom: 'auto'
      }
    }
  });
  addUtilities({
    '.tooltip': {
      '&-text,&-text:after': {
        opacity: 0,
        transitionProperty:
          'color,background-color,border-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-text-decoration-color,-webkit-backdrop-filter',
        transitionProperty:
          'color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter',
        transitionProperty:
          'color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter',
        transitionDelay: '.1s',
        transitionDuration: '.2s',
        transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)'
      },
      '&-text.tooltip-open,&-text.tooltip-open:after,&:hover:before,&:hover:after': {
        opacity: 1,
        transitionDelay: '75ms'
      },
      '&:not([data-tip]):hover:before, &:not([data-tip]):hover:after': {
        visibility: 'hidden',
        opacity: 0
      },

      // color
      '&-light': {
        '--tooltip-color': theme('colors.neutral-0'),
        '--tooltip-text-color': theme('colors.neutral-800')
      },
      '&-dark': {
        '--tooltip-color': theme('colors.neutral-600'),
        '--tooltip-text-color': theme('colors.neutral-0')
      },
      '&-accent': {
        '--tooltip-color': theme('colors.green.400'),
        '--tooltip-text-color': theme('colors.neutral-0')
      },
      '&-info': {
        '--tooltip-color': theme('colors.blue.400'),
        '--tooltip-text-color': theme('colors.neutral-900')
      },
      '&-success': {
        '--tooltip-color': theme('colors.green.500'),
        '--tooltip-text-color': theme('colors.neutral-900')
      },
      '&-warning': {
        '--tooltip-color': theme('colors.yellow.400'),
        '--tooltip-text-color': theme('colors.neutral-900')
      },
      '&-error': {
        '--tooltip-color': theme('colors.red.500'),
        '--tooltip-text-color': theme('colors.neutral-900')
      }
    }
  });
});

module.exports = tooltip;
