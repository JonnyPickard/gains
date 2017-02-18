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

  describe('#validPassword()', () => {
    it('it successfully compare the raw and hashed passwords', (done) => {
      let user = new User();
      let password = ('secret');
      let hashedPassword = user.hashPassword(password);

      user.validPassword(password, hashedPassword, (err, result) => {
        if (err) { throw err; }
        expect(result).to.equal(true);
        done();
      });
    });

    it('it unsuccessfully compare a fake and hashed password', (done) => {
      let user = new User();
      let password = ('secret');
      let fakePassword = ('fakePassword');

      user.validPassword(password, fakePassword, (err, result) => {
        if (err) { throw err; }
        expect(result).to.equal(false);
        done();
      });
    });
  });
});
