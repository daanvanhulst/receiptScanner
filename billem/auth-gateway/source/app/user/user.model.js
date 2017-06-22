'use strict';

var bcrypt   = require('bcrypt-nodejs');

class User {
  constructor(userData) {
    if (userData && userData._id) {
      this._id = userData._id
    }

    if (userData && userData.local) {
      this.local = userData.local;
    } else {
      this.local = {};
    }
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  validPassword (password) {
    return bcrypt.compareSync(password, this.local.password);
  }
}

module.exports = User;

