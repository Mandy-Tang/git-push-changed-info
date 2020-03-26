const fs = require('fs');
const { getChangedFilesFromLastPush } = require('./get-changed-files');
const shell = require('shelljs');


async function getChangedProjects() {
  const angularProjects = await getAngularProjects();
  const changedFiles = await getChangedFilesFromLastPush();

  const changedProjects = angularProjects.reduce((prev, cur) => {
    if (matchProject(cur, changedFiles)) {
      prev.push(cur);
    }
    return prev;
  }, []);

  shell.echo('you have changed these projects:');
  changedProjects.forEach(project => {
    shell.echo(project.project);
  })
  return changedProjects;
}

function matchProject(project, changedFiles) {
  return changedFiles.find(filePath => filePath.startsWith(project.root))
}

async function getAngularProjects() {
  const angularConfigData = fs.readFileSync('./angular.json');
  const angularConfig = JSON.parse(angularConfigData);
  const projects = angularConfig.projects;
  return filterProjectInfo(projects);
}

function filterProjectInfo(projects) {
  const results = [];
  for (const prop in projects) {
    if (projects.hasOwnProperty(prop)) {
      const project = projects[prop];
      results.push(
        {
          project: prop,
          root: project.root
        }
      )
    }
  }
  return results;
}

module.exports = {
  getChangedProjects
}
