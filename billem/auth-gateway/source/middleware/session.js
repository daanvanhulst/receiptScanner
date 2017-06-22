'use strict';

const session = require('express-session');
const flash   = require('connect-flash');

exports.register = (app) => {
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  
  app.use(flash());
};