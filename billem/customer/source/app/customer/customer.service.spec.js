'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-as-promised');

const dummyService = require('./dummy.service');
const dummyRepository = require('./dummy.repository');

let dummyRepositoryStub;

afterEach(() => {
  if (dummyRepositoryStub) {
    dummyRepositoryStub.restore();
  }
});

describe('unit: dummy.service - when getting dummy data', () => {
  it('it should resolve and return dummy data', () => {
    // arrange
    const dummyResponse = [{
      id: 1,
      login: 'dummy'
    }];

    const dummyModel = {
      id: 1,
      name: 'dummy'
    };

    dummyRepositoryStub = sinon
      .stub(dummyRepository, 'getDummyData')
      .resolves(dummyResponse);

    // act + assert
    return dummyService.getDummies()
      .then((response) => {
        expect(dummyRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal(dummyModel);
      });
  });

  it('it should reject the request and return an error message', () => {
    // arrange
    dummyRepositoryStub = sinon
      .stub(dummyRepository, 'getDummyData')
      .rejects({error: 'error'});

    // act + assert
    return dummyService.getDummies()
      .catch((response) => {
        expect(dummyRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal({error: 'error'});
      });
  });
});

