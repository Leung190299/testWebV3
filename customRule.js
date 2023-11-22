function checkLastSegment(node) {
  // report problem for function if last code path segment is reachable
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Description of the rule'
    },
    fixable: 'code',
    schema: [] // no options
  },
  create: function (context) {
    return {
      ReturnStatement: function (node) {
        // at a ReturnStatement node while going down
      },
      // at a function expression node while going up:
      'FunctionExpression:exit': checkLastSegment,
      'ArrowFunctionExpression:exit': checkLastSegment,
      onCodePathStart: function (codePath, node) {
        // at the start of analyzing a code path
      },
      onCodePathEnd: function (codePath, node) {
        // at the end of analyzing a code path
      }
    };
  }
};
