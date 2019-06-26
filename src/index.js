const express = require('express');

const { logsNumberOfRequests } = require('./middlewares');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(logsNumberOfRequests);
server.use(routes);

server.listen(3000);
