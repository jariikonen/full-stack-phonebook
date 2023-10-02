const express = require('express');

const { testing } = require('@util/common');
const routes = testing ? require('@util/testRoutes') : require('@util/routes');

const errorMiddleware = require('@middleware/errorMiddleware');

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

module.exports = app;
