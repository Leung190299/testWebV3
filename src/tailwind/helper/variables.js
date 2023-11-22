function combineVars(...variables) {
  const vari = variables.reverse().reduce((prev, current) => (prev ? `var(${current},${prev})` : `var(${current})`), '');
  return vari;
}

module.exports = {
  combineVars
};
