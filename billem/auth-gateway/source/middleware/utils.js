'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston
const morgan = require('morgan'); // https://www.npmjs.com/package/morgan
const cookieParser = require('cookie-parser'); // https://www.npmjs.com/package/cookie-parser
const bodyParser = require('body-parser'); // https://www.npmjs.com/package/body-parser
const cors = require('cors'); // https://www.npmjs.com/package/cors
const nconf = require('nconf'); // https://www.npmjs.com/package/nconf
const compression = require('compression'); // https://www.npmjs.com/package/compression
const rp = require('request-promise'); // https://www.npmjs.com/package/request-promise

exports.register = (app) => {
  let verboseLogging = (nconf.get('logging:level') === 'debug');
  let local = (nconf.get('application:local') === 'true');
  if (verboseLogging || local) {
    winston.info('app - utils: debug logging enabled loaded');

    app.use(morgan('dev'));
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {'timestamp': true});
    winston.info('app - utils: morgan dev loaded');

    if (!local) {
      require('request-debug')(rp); // https://www.npmjs.com/package/request-debug
      winston.info('app - utils: request-debug loaded');
    }
  } else {
    app.use(morgan('combined'));
    winston.info('app - utils: morgan combined loaded');
  }

  app.use(compression());
  winston.info('app - utils: gzip compression loaded');

  app.use(cookieParser());
  winston.info('app - utils: cookieparser loaded');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  winston.info('app - utils: bodyparser loaded');

  app.use(cors());
  winston.info('app - utils: cors loaded');

  app.options('*', cors());
  winston.info('app - utils: cors preflight loaded');
};

