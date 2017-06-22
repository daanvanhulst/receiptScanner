'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

const authRoutes = require('../app/auth/auth.controller');
const proxyRoutes = require('../app/proxy/proxy.controller');
// const userRoutes = require('../app/user/user.controller');

exports.register = (app) => {
  app.use(authRoutes);
  winston.info('app - routes: auth loaded');
  app.use(proxyRoutes);
  winston.info('app - routes: proxy loaded');
};

