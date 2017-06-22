'use strict';

class Module {
  constructor(moduleResponse) {
    this.id = moduleResponse.id;
    this.name = moduleResponse.name;
  }
}

module.exports = Module;
