'use strict';

const moduleRepository = require('./module.repository');
const Module = require('./module.model');

exports.getModules = () => {
  return moduleRepository.getModulesData()
    .then((response) => {
      const modules = [];
      for (let item of response) {
        const moduleItem = new Module(item);
        modules.push(moduleItem)
      };
      return modules;
    });
};

