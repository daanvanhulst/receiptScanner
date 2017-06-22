'use strict';

const mongoose = require('mongoose');

const mongoUrl = 'mongodb://customer-db:27017/Customer';
mongoose.Promise = require('bluebird');

var connectWithRetry = function() {
  return mongoose.connect(mongoUrl, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();

const customerSchema = mongoose.Schema({
  name: String,
});

var CustomerDB = mongoose.model('Customer', customerSchema);

exports.getCustomers = () => {
  return CustomerDB.find();
};

// exports.addModuleConfig = (fields, customerName, moduleName) => {
//   var moduleConfig = CustomerDB({
//     name: customerName,
//     moduleConfig: {
//       name: moduleName,
//       fields: fields
//     }
//   });

//   return moduleConfig.save();
// }
