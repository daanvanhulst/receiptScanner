'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston
const passport = require('passport');
const session = require('express-session');

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const userService = require('../app/user/user.service');
const User = require('../app/user/user.model');

const authConfig = require("../auth.config");
const jwt = require('jsonwebtoken');

exports.register = (app) => {
  // app.use(session({ secret: 'diksapislekker' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    userService.findUserById(id).then((user) => {
      done(null, user);
    },
      (err) => {
        done(err);
      });
  });

  passport.use('bearer', new BearerStrategy((token, done) => {
    jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
      if (err) return done(err);
      userService.findUserById(decoded.id).then(
        user => {
          return done(null, user);
        },
        error => {
          return done(error);
        });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    (req, email, password, done) => {
      userService.findUserByEmail(email).then(
        user => {
          // check to see if theres already a user with that email
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }

          user.token = jwt.sign({ id: user._id }, authConfig.jwtSecret);
          return done(null, user);
        },
        error => {
          return done(err);
        });
    }
  ));

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    (req, email, password, done) => {
      // asynchronous
      // User.findOne wont fire unless data is sent back    
      process.nextTick(() => {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        userService.findUserByEmail(email).then(
          user => {
            // check to see if theres already a user with that email
            if (user) {
              return done('User already taken');
            } else {
              // if there is no user with that email
              // create the user
              var newUser = new User();

              // set the user's local credentials
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              userService.addOrUpdateUser(newUser).then(newUser => {
                done(null, newUser); 
              }, error => { 
                done(error); 
              });
            }
          },
          error => {
            return done(error);
          }
        );
      });
    }));
};