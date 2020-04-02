function getArg(argName, argv) {
  const argStatement = argv.find(arg => arg.startsWith(`--${argName}=`));
  if (argStatement) {
    return argStatement.toUpperCase().split('=')[1];
  }
}

module.exports = {
  getArg,
};
