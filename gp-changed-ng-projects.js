const fs = require('fs');

async function getAngularProjects() {
  const angularConfigData = fs.readFileSync('./angular.json');
  const angularConfig = JSON.parse(angularConfigData);
  return getAllProjectPaths(angularConfig);
}

function getAllProjectPaths(config) {
  return Object.values(config.projects).map(projectConfig => projectConfig.root);
}
