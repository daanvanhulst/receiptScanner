'use strict';

class Module {
  constructor(moduleResponse) {
    this.id = moduleResponse.id;
    this.title = moduleResponse.title;

    if (moduleResponse.children && moduleResponse.children.length > 0) {
      this.children = this.mapChildren(moduleResponse.children);
    } else {
      this.children = [];
    }
  }

  mapChildren(items) {
    const children = [];
    for (let item of items) {
      children.push(new Module(item));
    };
    return children;
  }
}

module.exports = Module;

