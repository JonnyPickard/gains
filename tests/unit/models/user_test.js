const config     = require('../../config/test.config.js');
const chai       = require('chai');
const expect     = chai.expect;
const should     = chai.should();
const User       = require('../../../app/models/user.model');

describe('User', () => {

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
