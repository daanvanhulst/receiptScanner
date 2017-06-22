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

