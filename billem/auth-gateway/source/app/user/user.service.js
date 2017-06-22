'use strict';

const userRepository = require('./user.mongo.repository');
const User = require('./user.model');

exports.findUserById = (userId) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserById(userId)
      .then((response) => {
        let user = null;
        if(response) { 
          user = new User(response); 
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserByEmail(email)
      .then((response) => {
        let user = null;
        if(response) { 
          user = new User(response); 
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.findUserById = (id) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserById(id)
      .then((response) => {
        let user = null;
        if(response) { 
          user = new User(response); 
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.addOrUpdateUser = (addUser) => {
  return userRepository.addOrUpdateUser(addUser);
};