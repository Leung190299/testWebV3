// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const components = require('./src/tailwind/components');

/** Text styles */
const fontSize = {
  /** Heading */
  h0: ['6rem', '7rem'],
  h1: ['3.5rem', '4.5rem'],
  h2: ['3rem', '3.5rem'],
  h3: ['2.5rem', '3rem'],
  h4: ['2rem', '2.5rem'],
  h5: ['1.5rem', '2rem'],

  'h-d': ['6rem', '7rem'],
  'h-xl': ['3.5rem', '4.5rem'],
  'h-lg': ['3rem', '3.5rem'],
  'h-md': ['2.5rem', '3rem'],
  'h-sm': ['2rem', '2.5rem'],
  'h-xs': ['1.5rem', '2rem'],
  'h-xxs': ['1.25rem', '1.5rem'],

  /** Subtitle */
  's-xl': ['3rem', '3.5rem'],
  's-l': ['2.5rem', '3rem'],
  's-md': ['2rem', '2.5rem'],
  's-sm': ['1.5rem', '2rem'],

  /** body */
  xs: ['0.75rem', '1rem'],
  sm: ['0.875rem', '1.25rem'],
  base: ['1rem', '1.5rem'],
  md: ['1.125rem', '1.75rem'],
  lg: ['1.25rem', '1.75rem']
};

/** @type {import('./src/tailwind/types').Config} */
const itel = {
  themes: [
    {
      light: {
        'base-content': '#181818',
        'base-100': '#FFFFFF',
        neutral: '#666666',
        'neutral-content': '#FFFFFF',
        'subtle-content': '#666666',

        // Button filter
        '--filter-color': '#181818',
        '--filter-border': '#CCCCCC',
        '--filter-color-active': '#EA0029',
        '--filter-border-active': '#CCCCCC',
        '--filter-bg-active': 'transparent',

        // checkbox

        // Menu
        '--menu-bg': '#F1F1F2'
      },
      dark: {
        'base-content': '#FFFFFF',
        'base-100': '#121212',
        neutral: '#FFFFFF',

        // Button filter
        '--filter-color': '',
        '--filter-border': '#666666',
        '--filter-color-active': '',
        '--filter-border-active': '#CCCCCC',
        '--filter-bg-active': '#1F1F1F',

        // checkbox

        // Menu
        '--menu-bg': '#121212'
      }
    }
  ],
  button: {
    themes: [
      {
        light: {
          primary: {
            base: { content: '#FFFFFF', background: '#EA0029', border: '#EA0029' },
            hover: { background: '#CC0024', border: '#CC0024', content: '#FFFFFF' }
          },
          secondary: {
            base: { background: '#FFFFFF', content: '#EA0029', border: '#EA0029' },
            hover: { background: '#EA0029', content: '#FFFFFF', border: '#EA0029' },
            active: { background: '#EA0029' }
          },
          tertiary: {
            base: { background: '#F1F1F2', content: '#181818', border: '#F1F1F2' },
            hover: { background: '#F1F1F2', content: '#EA0029', border: '#F1F1F2' },
            active: { background: '#F1F1F2', content: '#EA0029', border: '#F1F1F2' }
          },
          ghost: {
            hover: { background: '#F1F1F2', content: '#EA0029' }
          }
        },
        dark: {
          primary: {
            base: { content: '#EA0029', background: '#FFFFFF', border: '#FFFFFF' },
            hover: { background: '#F1F1F2', border: '#F1F1F2', content: '#EA0029' }
          },
          secondary: {
            base: { background: 'transparent', content: '#FFFFFF', border: '#FFFFFF' },
            hover: { background: ['#FFFFFF', 0.05], border: ['#FFFFFF'] },
            active: { background: ['#FFFFFF', 0.1] }
          },
          tertiary: {
            base: { background: '#333333', content: '#FFFFFF', border: '#333333' },
            hover: { background: '#333333', content: '#FFFFFF', border: '#333333' },
            active: { background: '#333333', content: '#FFFFFF', border: '#333333' }
          },
          ghost: {
            hover: { background: '#333333', content: '#EA0029' }
          }
        }
      }
    ]
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/dev/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/dev/**/*.{tsx}'
  ],
  itel,
  theme: {
    extend: {
      screens: {
        // sm: '640px', // Under smartphone
        // md: '768px', // Under Table horizontal
        // lg: '1024px', // Under Tablet
        // xl: '1920px' // Desktop
        sm: '640px', // Under smartphone
        md: '760px', // Under Table horizontal
        // xl: '1016px', // Under Tablet
        xl: '1200px', // Under Tablet
        // xl: '1912px' // Desktop

        // xl: '1280px', // Under laptop
        // '2xl': '1440px', // Desktop
        // '2.5xl': '1550px',
        // '3xl': '1920px' // Desktop
        full: '1920px'
      },
      boxShadow: {
        'list-provider': 'rgba(85, 87, 95, 0.15) 0px 2px 13px 0px',
        itel: '0px 2px 13px 0px #55575F26'
      },
      dropShadow: {
        itel: '0px 2px 13px #55575F26',
        'about-itel': 'rgba(0, 0, 0, 0.4) 0px 5px 5px 0px'
      },
      container: {
        padding: {
          DEFAULT: '1rem'
        },
        center: true
      },
      padding: {
        4.5: '1.125rem'
      },
      aspectRatio: {
        cinema: '2 / 1',
        'cinema-veritcal': '1 / 2',
        'video-vertical': '9 / 16',
        video: '16 / 9',
        tivi: '4 / 3',
        'tivi-vertical': '3 / 4',
        photo: '3 / 2',
        'photo-vertical': '2 / 3',
        'section-banner': '3 / 1'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-price': 'linear-gradient(93.47deg, #FDD20D 0%, #FF5100 31.96%, #EA0029 100%);',
        'gradient-rank':
          'radial-gradient(40.64% 60.35% at 116.22% 79.91%, rgba(251, 222, 70, 0.5) 28.88%, rgba(251, 72, 136, 0) 100%, rgba(251, 190, 72, 0) 100%) , radial-gradient(52.5% 52.5% at 88.33% -11.25%, rgba(251, 70, 117, 0.5) 36.76%, rgba(251, 72, 136, 0) 100%) , radial-gradient(77.02% 88.9% at -17.22% -33.04%, rgba(255, 136, 69, 0.8) 30.34%, rgba(251, 83, 72, 0) 100%) , radial-gradient(52.83% 118.88% at -2.83% 77.25%, rgba(234, 0, 0, 0.8) 19.79%, rgba(251, 83, 72, 0) 100%) , linear-gradient(249.25deg, #EA0029 -6.02%, #FF6C54 100.4%);',
        'gradient-sale': 'linear-gradient(180deg, #0053DD 0%, #0C294E 100%)',
        'gradient-sim': 'linear-gradient(249.25deg, #EA0029 -6.02%, #FF6C54 100.4%)'
      },
      fontSize,
      fontFamily: {
        sans: ['var(--font-sans)', 'Times New Roman'],
        itel: ['var(--font-itel)', ...fontFamily.sans]
      },
      gridTemplateColumns: {
        'min-2': 'repeat(2, min-content)',
        'min-3': 'repeat(3, min-content)'
      },
      gridTemplateRows: {
        'min-2': 'repeat(2, min-content)',
        'min-3': 'repeat(3, min-content)'
      },
      margin: { 18: '4.5rem', 27: '6.75rem', 29: '7.25rem' },
      width: { 18: '4.5rem', 27: '6.75rem', 29: '7.25rem' },
      height: { 18: '4.5rem', 27: '6.75rem', 29: '7.25rem' },
      maxHeight: {
        modalFull: 'calc(100vh - 3rem)'
      },
      borderRadius: {
        inherit: 'inherit',
        '3xl': '2rem',
        '2.5xl': '1.5rem'
      },
      transitionTimingFunction: { deafult: 'ease' }
    },
    colors: {
      current: 'currentColor',
      primary: 'var(--p)',
      secondary: 'var(--s)',
      // Background
      b: {
        primary: 'rgb(var(--bg-primary))',
        secondary: 'rgb(var(--bg-secondary))'
      },
      // Foreground
      f: {
        primary: 'rgb(var(--fg-primary))',
        secondary: 'rgb(var(--fg-secondary))'
      },

      transparent: 'transparent',

      // branding: {
      'overlay-popup': '#000000',
      'modern-red': '#AA182C',
      orange: '#FF5100',
      'divider-rank': '#EBEBEB',
      'dark-blue': '#21145F',
      'pink-orange': '#FF8672',
      pink: '#F4436C',
      'green-yellow': '#CDDB00',
      // },
      'neutral-0': '#FFFFFF',
      'neutral-50': '#F9F9F9',
      'neutral-100': '#F1F1F2',
      'neutral-200': '#E6E7E8',
      'neutral-300': '#CCCCCC',
      'neutral-400': '#999999',
      'neutral-500': '#666666',
      'neutral-600': '#333333',
      'neutral-700': '#1F1F1F',
      'neutral-800': '#181818',
      'neutral-900': '#121212',
      'neutral-wf-700': '#141416',
      'neutral-wf-900': '#272727',

      red: {
        100: '#FFF1F2',
        200: '#FFD7CF',
        300: '#FFAFA3',
        400: '#F6564F',
        500: '#EA0029',
        600: '#CC0024'
      },
      blue: {
        100: '#F1F6FF',
        200: '#B8CDF0',
        300: '#99BBEC',
        400: '#6EA1E2',
        500: '#318CDD'
      },
      green: {
        100: '#EFFBF3',
        200: '#CCEFBB',
        300: '#B1E798',
        400: '#94DE75',
        500: '#70D44B',
        600: '#37BC06'
      },
      yellow: {
        100: '#FFF8D7',
        200: '#FFE7AF',
        300: '#FFDC8A',
        400: '#FFD262',
        500: '#FFC629',
        600: '#FBDBA4'
      },
      'layer-red': '#801221'
    }
  },
  safelist: ['animate-spin'],
  plugins: [
    require('prettier-plugin-tailwindcss'),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen md': {
            padding: '0 2.5rem'
          },
          '@screen xl': {
            maxWidth: '1352px'
          }
        }
      });
      addComponents({
        '.mobile-container': {
          maxWidth: '100%',
          '-TwBgOpacity': '1',
          backgroundColor: 'rgba(var(--b1) / var(--tw-bg-opacity))',

          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@screen md': {
            backgroundColor: 'transparent',
            paddingLeft: '0rem',
            paddingRight: '0rem'
          }
        }
      });
      // Tabs
      addComponents({
        tabs: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end'
        },
        tab: {
          position: 'relative',
          display: 'inline-flex',
          cursor: 'pointer',
          webkitUserSelect: 'none',
          userSelect: 'none',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '2rem',
          fontSize: '.875rem',
          lineHeight: '2',
          color: theme('colors.neutral-0'),
          paddingLeft: theme('padding.4'),
          paddingRight: theme('padding.4')
        }
      });
    }),
    ...components
  ]
};
