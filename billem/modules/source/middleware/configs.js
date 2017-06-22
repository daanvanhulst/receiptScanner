'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston
const nconf = require('nconf'); // https://www.npmjs.com/package/nconf
const path = require('path'); // https://www.npmjs.com/package/path

exports.register = () => {
  let rootPath = path.join(__dirname, '../');
  let configFile = 'config.json';

  // 1. any overrides
  nconf.overrides({});

  // 2. process.env
  // 3. process.argv
  nconf.env()
    .argv();

  // 4. Values in config.json
  nconf.file(rootPath + configFile);

  // 5. Any default values
  nconf.defaults({
    application: {
      port: 3100
    }
  });

  // Log current configuration
  winston.info('app - config: logging: ', nconf.get('logging'));
  winston.info('app - config: config file loaded from: ', rootPath + configFile);
  winston.info('app - config: application:', nconf.get('application'));

  winston.info('app - config: nconf loaded');
};

