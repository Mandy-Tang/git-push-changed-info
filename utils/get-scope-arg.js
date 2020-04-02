const SCOPE = {
  PROJECT: 'PROJECT',
  FILE: 'FILE',
  FILE_WITHOUT_SNAPSHOT: 'FILE_WITHOUT_SNAPSHOT'
}

function getScopeArg(argv) {
  const scopeArg = argv.find(arg => arg.startsWith('--scope='));
  if (!scopeArg) {
    return SCOPE.PROJECT;
  }

  const scope = scopeArg.toUpperCase().split('=')[1];
  if (!scope) {
    return SCOPE.PROJECT;
  }

  return SCOPE[scope] || SCOPE.PROJECT;
}

module.exports = {
  SCOPE,
  getScopeArg
}
