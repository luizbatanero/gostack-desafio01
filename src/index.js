const express = require('express');

const { logNumberOfRequests } = require('./middlewares');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(logNumberOfRequests);
server.use(routes);

server.listen(3000);
