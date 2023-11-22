const { generateBtnVariable } = require('../helper/btnVariable');

class ColorName {
  static get body() {
    return '--b-c';
  }
  static get subtitle() {
    return '--st-c';
  }
  static get supporting() {
    return '--sp-c';
  }
}

/**
 * @typedef ButtonColorName
 * @property  {'--p'} primary
 * @property  {'--ph'} primary-hover
 * @property  {'--pa'} primary-active
 * @property  {'--pb'} primary-border
 * @property  {'--pbh'} primary-border-hover
 * @property  {'--pba'} primary-border-active
 * @property  {'--pc'} primary-content
 * @property  {'--pch'} primary-content-hover
 * @property  {'--pca'} primary-content-active
 */

module.exports = {
  ...generateBtnVariable('primary', 'p'),
  ...generateBtnVariable('secondary', 's'),
  ...generateBtnVariable('tertiary', 't'),

  'ghost-hover': '--gh',
  'ghost-content-hover': '--gch',

  'base-100': '--b1',
  'base-200': '--b2',
  'base-300': '--b3',
  'base-content': '--bc',

  // 'body-content': '--bc',
  'subtle-content': '--stc',
  'support-content': '--spc',

  neutral: '--n',
  'neutral-content': '--nc',
  'neutral-focus': '--nf',

  info: '--in',
  'info-content': '--inc',

  success: '--su',
  'success-content': '--suc',

  warning: '--wa',
  'warning-content': '--wac',

  error: '--er',
  'error-content': '--erc'
};
