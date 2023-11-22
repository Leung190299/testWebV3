module.exports = {
  generateBtnVariable(name, prefix) {
    return {
      [name]: `--${prefix}`,
      [name + '-hover']: `--${prefix}h`,
      [name + '-active']: `--${prefix}a`,

      [name + '-border']: `--${prefix}b`,
      [name + '-border-hover']: `--${prefix}bh`,
      [name + '-border-active']: `--${prefix}ba`,

      [name + '-content']: `--${prefix}c`,
      [name + '-content-hover']: `--${prefix}ch`,
      [name + '-content-active']: `--${prefix}ca`
    };
  }
};
