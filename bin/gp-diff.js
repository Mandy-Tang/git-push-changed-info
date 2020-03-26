#!/usr/bin/env node
const { getChangedProjects } = require('../utils/get-changed-ng-projects');
const shell = require('shelljs');

main();

async function main() {
  let testCommand = `ng test --watch=false`;
  if (process.argv.length === 3) {
    testCommand = process.argv[2];
  }
  const changedProjects = await getChangedProjects();
  const result = changedProjects.map(project => {
    return shell.exec(`${testCommand} ${project.project}`);
  });
  const hasFailure = result.find(result => result.code !== 0);
  if (hasFailure) {
    shell.exit(1);
  }
  shell.exit(0);
}
