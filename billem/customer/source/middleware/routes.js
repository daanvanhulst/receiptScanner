'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

const moduleConfigRoutes = require('../app/module-config/module-config.controller');

exports.register = (app) => {
  app.use(moduleConfigRoutes);
  winston.info('app - routes: module-config loaded');
};

