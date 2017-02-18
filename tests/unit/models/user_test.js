process.env.NODE_ENV = 'test';

const dbCleaner  = require('../helpers/mongodb_cleaner');
const chai       = require('chai');
const expect     = chai.expect;
const should     = chai.should();
const User       = require('../../../app/models/user.model');

describe('User', () => {

  describe('#create()', () => {
    it('should create a new user', (done) => {
      var user = {
        local: {
          username: 'testName',
          email: 'testemail@email.com',
          password: 'testPassword',
        }
      };

      User.create(user, (err, createdUser) => {
        should.not.exist(err);
        should.exist(createdUser);

        expect(createdUser.local.username).to.equal('testName');
        expect(createdUser.local.email).to.equal('testemail@email.com');
        done();
      });
    });
  });

  describe('#hashPassword()', () => {
    it('it return a hash of the password', (done) => {
      var password = ('secret');
      var hashedPassword = new User().hashPassword(password);
      expect(password).not.to.equal(hashedPassword);
      done();
    });
  });

  // Pending untill mongoose promise library workaround found
  describe('#validPassword()', () => {
    xit('it successfully compare the raw and hashed passwords', () => {
      let password = ('secret');
      let hashedPassword = new User().hashPassword(password);

    });

    xit('it unsuccessfully compare a fake and hashed password', () => {
      let password = ('secret');
      let fakePassword = ('fakePassword');

    });
  });
});
