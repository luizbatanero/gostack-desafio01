const { Router } = require('express');

const { projects } = require('./data');
const { checksIfProjectIdExists } = require('./middlewares');

const routes = new Router();

/***
 * Lists all projects
 */
routes.get('/projects', (req, res) => {
  return res.json(projects);
});

/***
 * Creates new project
 */
routes.post('/projects', (req, res) => {
  const { id, title } = req.body;

  if (!id || !title) {
    return res.status('400').json({ error: 'Validation failed' });
  }

  const projectIdExists = projects.some(project => project.id === id);

  if (projectIdExists) {
    return res.status('400').json({ error: 'Project id already exists' });
  }

  const newProject = { id, title, tasks: [] };

  projects.push(newProject);

  return res.json(newProject);
});

/***
 * Updates project title by id
 */
routes.put('/projects/:id', checksIfProjectIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status('400').json({ error: 'Validation failed' });
  }

  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json(project);
});

/***
 * Deletes project by id
 */
routes.delete('/projects/:id', checksIfProjectIdExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});

/***
 * Creates new task inside
 * a given project
 */
routes.post('/projects/:id/tasks', checksIfProjectIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status('400').json({ error: 'Validation failed' });
  }

  const project = projects.find(project => project.id === id);

  project.tasks.push(title);

  return res.json(project);
});

module.exports = routes;
