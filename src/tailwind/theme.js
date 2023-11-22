const plugin = require('tailwindcss/plugin');
const Color = require('color');

const themes = require('./color/theme');

const color = require('./color');
const colorNames = require('./color/colorNames');

function generateForceGroundColorFrom(color, percentage = 0.8) {
  return Color(color)
    .mix(Color(Color(color).isDark() ? 'white' : 'black'), percentage)
    .rgb()
    .array()
    .map((v) => Number(v.toPrecision(4)))
    .join(' ');
}

/**
 *
 * @param {any} resultObj
 * @param {any} input
 * @param {keyof import('./types').ThemeConfig} property
 * @param {keyof import('./types').ThemeConfig} from
 */
function addDefaultIfNotExist(resultObj, input, property, from) {
  if (!input.hasOwnProperty(property)) {
    resultObj[colorNames[property]] = generateForceGroundColorFrom(input[from]);
  }
}

function generateFocusColor(color, darken = 0.1) {
  const darkerRgbArray = Color(color).darken(darken).rgb().array();
  return darkerRgbArray.map((v) => Number(v.toPrecision(4))).join(' ');
}

function generateSubtleColor(input, lighten = 0.1) {
  const darkerRgbArray = Color(input).lighten(lighten).rgb().array();
  return darkerRgbArray.map((v) => Number(v.toPrecision(4))).join(' ');
}

/**
 *
 * @param {ThemeConfig} input
 */
function convertTheme(input) {
  let resultObj = {};

  if (typeof input === 'object' && input !== null) {
    Object.entries(input).forEach(([name, value]) => {
      if (colorNames.hasOwnProperty(name)) {
        resultObj[colorNames[name]] = Color(value).rgb().array().join(' ');
      } else {
        resultObj[name] = value;
      }
    });

    if (!input.hasOwnProperty('neutral-focus')) resultObj[colorNames['neutral-focus']] = generateFocusColor(input['neutral'], 0.1);

    // auto generate base colors
    if (!input.hasOwnProperty('base-100')) {
      resultObj['--b1'] = '255 255 255';
    }

    if (!input.hasOwnProperty('base-200')) resultObj[colorNames['base-200']] = generateFocusColor(input['base-100'], 0.1);
    if (!input.hasOwnProperty('base-300')) {
      if (input.hasOwnProperty('base-200')) {
        resultObj[colorNames['base-300']] = generateFocusColor(input['base-200']);
      } else {
        resultObj[colorNames['base-300']] = generateFocusColor(input['base-100'], 0.2);
      }
    }

    // auto generate content colors
    addDefaultIfNotExist(resultObj, input, 'base-content', 'base-100');
    if (!input.hasOwnProperty('subtle-content')) {
      const baseRgb = Color.rgb(resultObj[colorNames['base-content']].split(' ').map(Number));
      resultObj[colorNames['subtle-content']] = generateForceGroundColorFrom(baseRgb, 0.4);
      // #181818 -> 24 24 24
      // #666666 -> 102 102 102

      // #FFFFFF -> 255 255 255
      // #999999 -> 153 153 153
      // const base = input['base-content'];
      // if (base == '#181818' || base == '#FFFFFF') {
      //   if (Color(base).isDark()) {
      //     // .lighten(3.25)
      //     console.log(base, Color(base).mix(Color('white'), 0.4).rgb(), resultObj[colorNames['subtle-content']]);
      //   } else {
      //     console.log(base, Color(base).mix(Color('black'), 0.4).rgb(), resultObj[colorNames['subtle-content']]);
      //   }
      // }
    }

    addDefaultIfNotExist(resultObj, input, 'neutral-content', 'neutral');

    return resultObj;
  }

  return input;
}
/**
 *
 *  @typedef {import('./types').ButtonStyleConfig} ButtonStyleConfig
 *
 * @param {Record<'primary' | 'secondary' | 'tertiary', Partial<ButtonStyleConfig>>} input
 * @returns
 */
function convertButton(input) {
  let resultObj = {};
  if (typeof input === 'object' && input !== null) {
    input.primary.active;

    Object.entries(input).forEach(([variant, value]) => {
      Object.entries(value).forEach(([type, typeStyle]) => {
        Object.entries(typeStyle).forEach(([name, style]) => {
          const keylist = [variant];
          if (name !== 'background') keylist.push(name);
          if (type !== 'base') keylist.push(type);

          const key = keylist.join('-');
          const [color, opacity = 1] = Array.isArray(style) ? style : [style];
          if (colorNames.hasOwnProperty(key)) resultObj[colorNames[key]] = Color(color, 'hex').alpha(opacity).hexa();
        });
      });
    });
    return resultObj;
  }
  return input;
}

const theme = plugin(
  function ({ config, addBase }) {
    /** @typedef {import('./types').ThemeConfig} ThemeConfig */

    let includedThemesObj = new Object();
    const themeOrder = [];

    // Default themes
    Object.entries(themes).forEach(([theme, index]) => {
      includedThemesObj[theme] = convertTheme(themes[theme]);
    });

    // Custom Theme
    if (config('itel.themes')) {
      /**
       * @type {Record<string,ThemeConfig>[]|Record<string,ThemeConfig>}
       */
      const themes = config('itel.themes');
      const customThemes = Array.isArray(themes) ? themes : [themes];
      customThemes.forEach((item) => {
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([themeName, themeValue]) => {
            includedThemesObj['[data-theme=' + themeName + ']'] = convertTheme(themeValue);
            themeOrder.push(themeName);
          });
        }
      });
    }

    // Custom buttons
    if (config('itel.button.themes')) {
      const t = config('itel.button.themes');
      const customThemes = Array.isArray(t) ? t : [t];
      customThemes.forEach((item) => {
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([themeName, buttonConfig]) => {
            includedThemesObj['[data-theme=' + themeName + ']'] ||= {};
            Object.assign(includedThemesObj['[data-theme=' + themeName + ']'], convertButton(buttonConfig));
          });
        }
      });
    }

    addBase({
      ':root,[data-theme]': {
        backgroundColor: 'rgba(var(--b1)/var(--tw-bg-opacity,1))',
        color: 'rgba(var(--bc)/var(--tw-text-opacity,1))'
      }
    });
    addBase({
      [themeOrder.map((k) => '.theme-' + k).join(',')]: {
        backgroundColor: 'rgba(var(--b1)/var(--tw-bg-opacity,1))',
        color: 'rgba(var(--bc)/var(--tw-text-opacity,1))'
      }
    });

    themeOrder.forEach((themeName, index) => {
      addBase({
        ['.theme-' + themeName + ',[data-theme=' + themeName + ']']: includedThemesObj['[data-theme=' + themeName + ']']
      });
    });
  },
  {
    theme: {
      extend: {
        colors: color
      }
    }
  }
);

module.exports = theme;
