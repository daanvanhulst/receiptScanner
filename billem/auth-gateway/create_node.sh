echo make sure to start this with admin privileges!

# 1. Add source folder in root directory and cd into it
echo 1. Add source folder in root directory and cd into it
mkdir source && cd source

# 2. Generate using express-generator
echo 2. Generate using express-generator
npm install express-generator -g
express -e --git
npm install

# 3. Reorganize files
echo 3. Reorganize files
mv .gitignore ../
mkdir middleware app
rm -rf routes views public/*

# 4. Remove unused ejs dependency in package.json
echo 4. Remove unused ejs dependency in package.json
sed -i '/\"ejs\"/d' ./package.json

# 5. Add node modules
echo 5. Add node modules
npm install --save compression cors lodash nconf request-debug request-promise winston
npm install --save-dev chai eslint eslint-config-standard eslint-plugin-promise eslint-plugin-standard eslint-watch istanbul mocha nock nodemon sinon sinon-as-promised supertest

# 6. Create eslint files
echo 6. Create eslint files
cat <<EOF >./.eslintignore
/public/**/*.js
/coverage/**/*.js
EOF

cat <<EOF >./.eslintrc.yml
extends: standard
plugins:
- standard
parserOptions:
ecmaversion: 6
env:
node: true
es6: true
mocha: true
rules:
semi:
  - error
  - always
quotes:
  - error
  - single
curly: error
space-before-function-paren: off
EOF

# 7. Add NPM tasks
echo 7. Add NPM tasks
sed -i '/start/c\    "start": "npm install && nodemon ./bin/www",\n    "test": "npm run build",\n    "build": "npm install && npm run lint && npm run test:single && npm run coverage",\n    "lint": "esw .",\n    "lint:watch": "esw . -w",\n    "test:single": "npm run unit-tests && npm run integration-test",\n    "unit-tests": "mocha --check-leaks --harmony app/**/*.spec.js",\n    "unit-tests:watch": "mocha --check-leaks --harmony app/**/*.spec.js -w",\n    "integration-test": "mocha --check-leaks --harmony app/**/*.integration.js",\n    "coverage": "npm run coverage-unit-tests && npm run coverage-integration-tests",\n    "coverage-unit-tests": "istanbul cover --root app --dir ./coverage/unit -x **.integration.js -x **/**/*.spec.js ./node_modules/mocha/bin/_mocha -- --check-leaks --harmony --grep unit app/**/*.js",\n    "coverage-integration-tests": "istanbul cover --root app --dir ./coverage/integration -x **.integration.js -x **.spec.js ./node_modules/mocha/bin/_mocha -- --check-leaks --harmony --grep integration app/**/*.js"' ./package.json

# 8. Create additional files
echo 8. Create additional files
cat <<EOF >./config.json
{
  "application": {
    "port": 3100,
    "local": "true"
  },
  "logging": {
    "level": "info"
  }
}

EOF

cat <<EOF >./middleware/configs.js
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

EOF

cat <<EOF >./middleware/handlers.js
'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

exports.register = (app) => {
  registerDefaultHandler(app);
  winston.info('app - handlers: default handler loaded');

  registerNotFoundHandler(app);
  winston.info('app - handlers: not found handler loaded');

  registerErrorHandler(app);
  winston.info('app - handlers: error handler loaded');
};

function registerDefaultHandler(app) {
  app.get('/', (req, res) => {
    res.send('');
  });
}

function registerNotFoundHandler(app) {
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}

/**
 * development error handler, will print stacktrace
 * production error handler, no stack traces leaked to user
 * @param app
 */
function registerErrorHandler(app) {
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
        .send({message: err.message, error: err});
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
      .send(err.message);
  });
}

EOF

cat <<EOF >./middleware/routes.js
'use strict';

exports.register = (app) => {

};

EOF

cat <<EOF >./middleware/utils.js
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

EOF

# 9. Update app.js and bin/www
echo 9. Update app.js and bin/www
cat <<EOF >./app.js
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
EOF

cat <<EOF >./bin/www
#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */

const nconf = require('nconf');
const app = require('../app');
const debug = require('debug')('source:server');
const http = require('http');
const winston = require('winston');

winston.info('http loading');
const port = normalizePort(nconf.get('application:port'));
const server = http.createServer(app);
app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
winston.info('http loaded');
winston.info('node application started and listening on port', port);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = server;
EOF

# 10. Dummy files to get started with a new 'module' including tests
echo 10. Dummy files to get started with a new 'module' including tests
mkdir app/dummies

cat <<EOF >./app/dummies/dummy.controller.js
'use strict';

const express = require('express');
const router = express.Router();

const dummyService = require('./dummy.service');

router.get('/dummies', (req, res) => {
  dummyService.getDummies()
    .then((response) => {
      res.send(response);
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});

module.exports = router;

EOF

cat <<EOF >./middleware/routes.js
'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

const dummyRoutes = require('../app/dummies/dummy.controller');

exports.register = (app) => {
  app.use(dummyRoutes);
  winston.info('app - routes: dummy loaded');
};

EOF

cat <<EOF >./app/dummies/dummy.service.js
'use strict';

const dummyRepository = require('./dummy.repository');
const Dummy = require('./dummy.model');

exports.getDummies = () => {
  return new Promise((resolve, reject) => {
    dummyRepository.getDummyData()
      .then((response) => {
        const dummy = new Dummy(response[0]);
        resolve(dummy);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

EOF

cat <<EOF >./app/dummies/dummy.model.js
'use strict';

class Dummy {
  constructor(dummyResponse) {
    this.id = dummyResponse.id;
    this.name = dummyResponse.login;
  }
}

module.exports = Dummy;

EOF

cat <<EOF >./app/dummies/dummy.repository.js
'use strict';

const rp = require('request-promise');

exports.getDummyData = () => {
  const options = {
    uri: 'https://api.github.com/users',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  return rp(options)
    .then((response) => {
      return response;
    })
    .catch((response) => {
      throw response;
    });
};

EOF

cat <<EOF >./app/dummies/dummy.controller.spec.js
'use strict';

const app = require('../../app');
const server = app.listen();
const winston = require('winston');
const supertest = require('supertest').agent(server);
const sinon = require('sinon');
require('sinon-as-promised');

const dummyService = require('./dummy.service');

let dummyServiceStub;

before(() => {
  try {
    winston.remove(winston.transports.Console);
  } catch (error) {

  }
});

after(() => {
  server.close();
});

afterEach(() => {
  if (dummyServiceStub) {
    dummyServiceStub.restore();
  }
});

describe('unit: dummy.controller - when getting dummies', () => {
  it('it should resolve and return dummies', () => {
    // arrange
    const dummy = {
      id: 1,
      login: 'dummy'
    };

    dummyServiceStub = sinon
      .stub(dummyService, 'getDummies')
      .resolves(dummy);

    // act + assert
    return supertest
      .get('/dummies')
      .expect(200, dummy);
  });

  it('it should reject and return an error message', () => {
    // arrange
    dummyServiceStub = sinon
      .stub(dummyService, 'getDummies')
      .rejects({statusCode: 500, error: {error: 'error'}});

    // act + assert
    return supertest
      .get('/dummies')
      .expect(500, {error: 'error'});
  });
});

EOF

cat <<EOF >./app/dummies/dummy.service.spec.js
'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-as-promised');

const dummyService = require('./dummy.service');
const dummyRepository = require('./dummy.repository');

let dummyRepositoryStub;

afterEach(() => {
  if (dummyRepositoryStub) {
    dummyRepositoryStub.restore();
  }
});

describe('unit: dummy.service - when getting dummy data', () => {
  it('it should resolve and return dummy data', () => {
    // arrange
    const dummyResponse = [{
      id: 1,
      login: 'dummy'
    }];

    const dummyModel = {
      id: 1,
      name: 'dummy'
    };

    dummyRepositoryStub = sinon
      .stub(dummyRepository, 'getDummyData')
      .resolves(dummyResponse);

    // act + assert
    return dummyService.getDummies()
      .then((response) => {
        expect(dummyRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal(dummyModel);
      });
  });

  it('it should reject the request and return an error message', () => {
    // arrange
    dummyRepositoryStub = sinon
      .stub(dummyRepository, 'getDummyData')
      .rejects({error: 'error'});

    // act + assert
    return dummyService.getDummies()
      .catch((response) => {
        expect(dummyRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal({error: 'error'});
      });
  });
});

EOF

cat <<EOF >./app/dummies/dummy.repository.spec.js
'use strict';

const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const dummyRepository = require('./dummy.repository');

afterEach(() => {
  nock.cleanAll();
});

describe('unit: dummy.repository - when getting dummy data', () => {
  it('it should resolve and return dummy data', () => {
    // arrange
    const dummyResponse = [
      {id: 1, login: 'dummy'},
      {id: 2, login: 'dummy2'}
    ];

    nock('https://api.github.com')
      .get('/users')
      .reply(200, dummyResponse);

    // act + assert
    return dummyRepository.getDummyData()
      .then((response) => {
        expect(response).to.deep.equal(dummyResponse);
      });
  });

  it('it should reject and return an error message', () => {
    // arrange
    nock('https://api.github.com')
      .get('/users')
      .replyWithError({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    // act + assert
    return dummyRepository.getDummyData()
      .catch((response) => {
        expect(response.error).to.deep.equal({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
      });
  });
});

EOF

cat <<EOF >./app/dummies/dummy.integration.js
'use strict';

const app = require('../../bin/www');
const server = app.listen();
const supertest = require('supertest').agent(server);
const winston = require('winston');
const nock = require('nock');

before(() => {
  try {
    winston.remove(winston.transports.Console);
  } catch (error) {

  }
});

after(() => {
  server.close();
});

afterEach(() => {
  nock.cleanAll();
});

describe('integration: dummy.integration.js - when getting dummies', () => {
  const dummyResponse = [
    {id: 1, login: 'dummy'},
    {id: 2, login: 'dummy2'}
  ];

  const dummyModel = {id: 1, name: 'dummy'};

  it('it should return dummies', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(200, dummyResponse);

    return supertest
      .get('/dummies')
      .expect(200, dummyModel);
  });

  it('it should return not found', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(404);

    return supertest
      .get('/dummies')
      .expect(404);
  });

  it('it should return error', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    return supertest
      .get('/dummies')
      .expect(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
  });
});

EOF

echo Testing application now...
npm test