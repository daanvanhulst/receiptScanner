'use strict';

const mongoose = require('mongoose');
const mongoUrl = 'mongodb://auth-db/User';

var connectWithRetry = function() {
  return mongoose.connect(mongoUrl, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();

const userSchema = mongoose.Schema({
  local            : {
    email        : String,
    password     : String,
  }
});

var UserDB = mongoose.model('User', userSchema);

exports.findUserByEmail = (email) => {
  return UserDB.findOne({ 'local.email' :  email });
};

exports.findUserById = (id) => {
  return UserDB.findOne({ '_id' :  id });
};

exports.addOrUpdateUser = (userData) => {
  return new Promise((resolve, reject) => {
    this.findUserById(userData._id)
    .then((dbUser) => {
      if(!dbUser) {
        dbUser = new UserDB();
      }
      dbUser.local.email = userData.local.email;
      dbUser.local.password = userData.local.password;

      dbUser.save()
      .then((response) => {
        resolve(response)
      }, (error) => {
        reject(error);
      });
    }, 
    (error) => {
      reject(error);
    });
  });
}