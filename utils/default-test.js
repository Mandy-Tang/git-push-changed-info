const {getChangedProjects} = require('./get-changed-ng-projects');
const shell = require('shelljs');

async function runDefaultTest() {
  const testCommand = `ng test --watch=false`;
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

module.exports = {
  runDefaultTest
}
