const {getScopeArg, SCOPE} = require('./get-scope-arg');
const {getChangedProjects} = require('./get-changed-ng-projects');
const shell = require('shelljs');

async function runJestTest(argv) {
  const scope = getScopeArg(argv);
  switch (scope) {
    case SCOPE.FILE_WITHOUT_SNAPSHOT:
      return runJestForChangedFilesWithOutSnapshot();
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
  }
  shell.exit(0);
}

function runJestForChangedFiles() {
  shell.exit(0);
}

function runJestForChangedFilesWithOutSnapshot() {
  shell.exit(0);
}

module.exports = {
  runJestTest
}
