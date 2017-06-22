'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const winston = require('winston');

const userService = require('../user/user.service');

// process the login form
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return next("Pass error here. User not set or so"); }

    req.login(user, (err) => {
      if (err) return next(err);
      // res.writeHead(302, {
      //   'Location': req.session.redirectUrl + '?token=' + user + '&user=' + user.email
      // });
      res.json({ token: user.token });
      res.end();
    });
  })(req, res, next);
});

//TODO: fix logout
router.get('/logout', (req, res) => {
  winston.log('in router.get /logout');
  req.logout();
});

// process the signup form
router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, data, info) => {
    if (err) { return next(err); }
    if (!data) { return next(info); }
    res.end();
  })(req, res, next);
});

router.all('*', (req, res, next) => {
  passport.authenticate('bearer', (err, user, info) => {
    if (err) return next(err);
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    }
  })(req, res, next);
});

module.exports = router;