'use strict';

const winston = require('winston');
const nconf = require('nconf');

winston.info('app: configs loading');
const configs = require('./middleware/configs');
configs.register();
winston.info('app: configs loaded');

winston.info('app loading');

winston.info('app: express loading');
const express = require('express');
let app = express();
winston.info('app: express loaded');

winston.info('app: utils loading');
const utils = require('./middleware/utils');
utils.register(app);
winston.info('app: utils loaded');

winston.info('app: routes loading');
const routes = require('./middleware/routes');
routes.register(app);
winston.info('app: routes loaded');

winston.info('app: handlers loading');
const handlers = require('./middleware/handlers');
handlers.register(app);
winston.info('app: handlers loaded');

winston.info('app loaded');

winston.level = nconf.get('logging:level');

module.exports = app;
