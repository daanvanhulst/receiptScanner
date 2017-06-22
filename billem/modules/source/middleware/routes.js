'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

const moduleRoutes = require('../app/module/module.controller');

exports.register = (app) => {
  app.use(moduleRoutes);
  winston.info('app - routes: module loaded');
};

