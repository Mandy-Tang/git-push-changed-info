const { getArg } = require('./get-arg');

const SCOPE = {
  PROJECT: 'PROJECT',
  FILE: 'FILE'
}

function getScopeArg(argv) {
  const scope = getArg('scope', argv);

  if (!scope) {
    return SCOPE.PROJECT;
  }

  return SCOPE[scope] || SCOPE.PROJECT;
}

module.exports = {
  SCOPE,
  getScopeArg
}
