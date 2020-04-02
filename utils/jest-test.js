const { getScopeArg, SCOPE } = require('./get-scope-arg');
const { getChangedProjects } = require('./get-changed-ng-projects');
const { gitCurrentBranch, gitCherry } = require('./git');
const shell = require('shelljs');

async function runJestTest(argv) {
  const scope = getScopeArg(argv);
  switch (scope) {
    case SCOPE.FILE:
      return runJestForChangedFiles();
    case SCOPE.PROJECT:
    default:
      return await runJestForChangedProjects();
  }
}

async function runJestForChangedProjects() {
  const testCommand = `jest`;
  const changedProjects = await getChangedProjects();
  const result = changedProjects.map(project => {
    return shell.exec(`${testCommand} ${project.project}`);
  });
  const hasFailure = result.find(result => result.code !== 0);
  if (hasFailure) {
    shell.exit(1);
  } else {
    shell.exit(0);
  }
}

async function runJestForChangedFiles() {
  const currentBranch = await gitCurrentBranch();
  const cherryInfo = await gitCherry();
  const commitsLength = cherryInfo.split('\n+').length;
  const lastPushedCommit = `${currentBranch.trim()}~${commitsLength}`;
  const command = `jest --changedSince=${lastPushedCommit}`;

  console.log(command);
  const result = shell.exec(command);
  if (result.code === 0) {
    shell.exit(0);
  } else {
    shell.exit(1);
  }
}

module.exports = {
  runJestTest,
};
