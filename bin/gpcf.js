#!/usr/bin/env node
const { getChangedProjects } = require('../utils/get-changed-ng-projects');
const shell = require('shelljs');

main();

async function main() {
  const changedProjects = await getChangedProjects();
  const result = changedProjects.map(project => {
    return shell.exec(`ng test ${project.project} --watch=false`);
  });
  const hasFailure = result.find(result => result.code !== 0);
  if (hasFailure) {
    shell.exit(1);
  }
  shell.exit(0);
}
