'use strict';

const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const dummyRepository = require('./dummy.repository');

afterEach(() => {
  nock.cleanAll();
});

describe('unit: dummy.repository - when getting dummy data', () => {
  it('it should resolve and return dummy data', () => {
    // arrange
    const dummyResponse = [
      {id: 1, login: 'dummy'},
      {id: 2, login: 'dummy2'}
    ];

    nock('https://api.github.com')
      .get('/users')
      .reply(200, dummyResponse);

    // act + assert
    return dummyRepository.getDummyData()
      .then((response) => {
        expect(response).to.deep.equal(dummyResponse);
      });
  });

  it('it should reject and return an error message', () => {
    // arrange
    nock('https://api.github.com')
      .get('/users')
      .replyWithError({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    // act + assert
    return dummyRepository.getDummyData()
      .catch((response) => {
        expect(response.error).to.deep.equal({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
      });
  });
});

