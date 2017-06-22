'use strict';

const customerRepository = require('./customer.mongo.repository');

exports.getCustomers = () => {
  return customerRepository.getCustomers();
};

// exports.addModuleConfig = (fields, customerName, moduleName) => {
//   return moduleConfigRepository.addModuleConfig(fields, customerName, moduleName);
// };
