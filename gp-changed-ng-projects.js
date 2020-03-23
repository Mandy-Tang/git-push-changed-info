const fs = require('fs');
const { getChangedFilesFromLastPush } = require('./gp-changed-files');


async function getChangedProjects() {
  const angularProjects = await getAngularProjects();
  const changedFiles = await getChangedFilesFromLastPush();

  const changedProjects = angularProjects.reduce((prev, cur) => {
    if (matchProject(cur, changedFiles)) {
      prev.push(cur);
    }
    return prev;
  }, [])

  return changedProjects;
}

function matchProject(projectRoot, changedFiles) {
  return changedFiles.find(filePath => filePath.startsWith(projectRoot))
}

async function getAngularProjects() {
  const angularConfigData = fs.readFileSync('./angular.json');
  const angularConfig = JSON.parse(angularConfigData);
  return getAllProjectPaths(angularConfig);
}

function getAllProjectPaths(config) {
  return Object.values(config.projects).map(projectConfig => projectConfig.root);
}
