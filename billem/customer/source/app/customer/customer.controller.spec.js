'use strict';

const app = require('../../app');
const server = app.listen();
const winston = require('winston');
const supertest = require('supertest').agent(server);
const sinon = require('sinon');
require('sinon-as-promised');

const dummyService = require('./dummy.service');

let dummyServiceStub;

before(() => {
  try {
    winston.remove(winston.transports.Console);
  } catch (error) {

  }
});

after(() => {
  server.close();
});

afterEach(() => {
  if (dummyServiceStub) {
    dummyServiceStub.restore();
  }
});

describe('unit: dummy.controller - when getting dummies', () => {
  it('it should resolve and return dummies', () => {
    // arrange
    const dummy = {
      id: 1,
      login: 'dummy'
    };

    dummyServiceStub = sinon
      .stub(dummyService, 'getDummies')
      .resolves(dummy);

    // act + assert
    return supertest
      .get('/dummies')
      .expect(200, dummy);
  });

  it('it should reject and return an error message', () => {
    // arrange
    dummyServiceStub = sinon
      .stub(dummyService, 'getDummies')
      .rejects({statusCode: 500, error: {error: 'error'}});

    // act + assert
    return supertest
      .get('/dummies')
      .expect(500, {error: 'error'});
  });
});

