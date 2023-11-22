function withOpacityValue(variable, fallbackColor) {
  return ({ opacityValue }) => {
    let fallbackColorValue = '';
    if (fallbackColor) {
      fallbackColorValue = `, var(${fallbackColor})`;
    }
    if (opacityValue === undefined) {
      return `rgba(var(${variable}${fallbackColorValue}))`;
    }
    return `rgba(var(${variable}${fallbackColorValue}) / ${opacityValue})`;
  };
}

const colorObject = {
  'base-100': withOpacityValue('--b1'),
  'base-200': withOpacityValue('--b2', '--b1'),
  'base-300': withOpacityValue('--b3', '--b2'),
  'base-content': withOpacityValue('--bc'),
  'subtle-content': withOpacityValue('--stc'),
  // 'base-content': withOpacityValue('--bc'),

  neutral: withOpacityValue('--n'),
  'neutral-focus': withOpacityValue('--nf', '--n'),
  'neutral-content': withOpacityValue('--nc')
};
module.exports = colorObject;
