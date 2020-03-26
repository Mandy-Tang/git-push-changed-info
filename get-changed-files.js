const shell = require('shelljs');
const chalk = require('chalk');


async function getChangedFilesFromLastPush() {
  const gitCherryInfo  = await gitCherry();

  const commits = getCommits(gitCherryInfo);

  if (!commits || commits.length === 0) {
    return;
  }

  const changedFiles = await getChangedFilesFromCommits(commits);
  shell.echo(chalk.bgCyanBright('you have changed those files:'));
  changedFiles.forEach(filePath => shell.echo(chalk.blueBright(filePath)));
  return changedFiles;
}

function gitCherry () {
  return new Promise((resolve, reject) => {
    shell.exec('git cherry -v', {silent: true}, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(err)
      }
      resolve(stdout);
    })
  })
}

function gitDiff (from, to) {
  return new Promise((resolve, reject) => {
    shell.exec(`git diff ${from}~1 ${to} --name-only`, {silent: true}, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(err)
      }
      resolve(stdout);
    })
  })
}

function getCommits(cherryInfo) {
  const commits = cherryInfo.split('\n+');

  const shas = commits.reduce((accu, cur) => {
    const sha = findSha(cur);
    if (sha) {
      accu.push(sha);
    }
    return accu;
  }, []);

  return shas;
};

function findSha(commitInfo) {
  const shaLength = 40;
  const index = commitInfo.search(/[0-9A-Za-z]{40}/);
  if (index !== -1) {
    return commitInfo.substring(index, index + shaLength);
  }
};

async function getChangedFilesFromCommits(commits) {
  const from = commits[0];
  const to = commits[commits.length - 1];
  const changedFilesInfo = await gitDiff(from, to);
  return changedFilesInfo.toString().split('\n').filter(path => path !== '');
}

module.exports = {
  getChangedFilesFromLastPush
}
