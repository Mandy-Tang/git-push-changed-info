const { getArg } = require('./get-arg');

const TOOL = {
  JEST: 'JEST',
  DEFAULT: 'DEFAULT',
};

function getToolArg(argv) {
  const tool = getArg('tool', argv);

  if (!tool) {
    return TOOL.DEFAULT;
  }

  return TOOL[tool] || TOOL.DEFAULT;
}

module.exports = {
  TOOL,
  getToolArg,
};
