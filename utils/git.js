const shell = require('shelljs');

function gitCurrentBranch() {
  return new Promise((resolve, reject) => {
    shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(err);
      }
      resolve(stdout);
    });
  });
}

function gitCherry() {
  return new Promise((resolve, reject) => {
    shell.exec('git cherry -v', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(err);
      }
      resolve(stdout);
    });
  });
}

function gitDiff(from, to) {
  return new Promise((resolve, reject) => {
    shell.exec(
      `git diff ${from}~1 ${to} --name-only`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code !== 0) {
          return reject(err);
        }
        resolve(stdout);
      }
    );
  });
}

module.exports = {
  gitCurrentBranch,
  gitCherry,
  gitDiff
}
