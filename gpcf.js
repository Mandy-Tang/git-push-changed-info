#!/usr/bin/env node
const { getChangedProjects } = require('./gp-changed-ng-projects');
const shell = require('shelljs');

main();

async function main() {
  const changedProjects = await getChangedProjects();
  const result = changedProjects.map(project => {
    return shell.exec(`ng test ${project.project} --watch=false`);
  });
  const hasFailure = result.find(result => result.code !== 0);
  if (hasFailure) {
    shell.exec(1);
  }
  shell.exec(0);
}
