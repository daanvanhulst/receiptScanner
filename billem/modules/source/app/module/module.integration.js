'use strict';

const app = require('../../bin/www');
const server = app.listen();
const supertest = require('supertest').agent(server);
const winston = require('winston');
const nock = require('nock');

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
  nock.cleanAll();
});

describe('integration: dummy.integration.js - when getting dummies', () => {
  const dummyResponse = [
    {id: 1, login: 'dummy'},
    {id: 2, login: 'dummy2'}
  ];

  const dummyModel = {id: 1, name: 'dummy'};

  it('it should return dummies', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(200, dummyResponse);

    return supertest
      .get('/dummies')
      .expect(200, dummyModel);
  });

  it('it should return not found', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(404);

    return supertest
      .get('/dummies')
      .expect(404);
  });

  it('it should return error', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    return supertest
      .get('/dummies')
      .expect(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
  });
});

