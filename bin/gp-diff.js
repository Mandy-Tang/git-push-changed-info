#!/usr/bin/env node
const { runJestTest } = require('../utils/jest-test');
const { getToolArg, TOOL } = require('../utils/get-tool-arg');
const { runDefaultTest } = require('../utils/default-test');

main();

async function main() {
  const tool = getToolArg(process.argv);
  switch (tool) {
    case TOOL.JEST:
      await runJestTest(process.argv);
      break;
    case TOOL.DEFAULT:
    default:
      await runDefaultTest(process.argv);
      break;
  }
}
