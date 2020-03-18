const cmd = require('node-cmd');

getChangedFilesFromLastPush();

async function getChangedFilesFromLastPush() {
  const gitCherryInfo  = await gitCherry();

  const commits = getCommits(gitCherryInfo);

  if (!commits || commits.length === 0) {
    return;
  }

  const changedFiles = await getChangedFilesFromCommits(commits);
  console.log('you have changed those files:\n');
  console.log(changedFiles);
  return changedFiles;
}

function gitCherry () {
  return new Promise((resolve, reject) => {
    cmd.get('git cherry -v', (err, data, stderr) => {
      if (err) {
        return reject(err)
      }
      resolve(data);
    })
  })
}

function gitDiff (from, to) {
  return new Promise((resolve, reject) => {
    cmd.get(`git diff ${from}~1 ${to} --name-only`, (err, data, stderr) => {
      if (err) {
        return reject(err)
      }
      resolve(data);
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
  return await gitDiff(from, to);
}
