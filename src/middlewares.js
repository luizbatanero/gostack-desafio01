const { projects } = require('./data');

/***
 * Logs the number of requests to
 * the console on each request
 */
const logNumberOfRequests = (req, res, next) => {
  console.count('Number of requests');

  return next();
};

/***
 * Checks if a project with
 * a given id exists
 */
const checkIfProjectIdExists = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(project => project.id === id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
};

module.exports = {
  logNumberOfRequests,
  checkIfProjectIdExists
};
