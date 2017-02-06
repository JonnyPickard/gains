process.env.NODE_ENV = 'test';

const dbCleaner  = require('../helpers/mongodb_cleaner');
const chai       = require('chai');
const expect     = chai.expect;
const should     = chai.should();
const User       = require('../../../app/models/user.model');

describe('User', function() {

  describe('#create()', function(){
    it('should create a new user', function(done){
      var user = {
        local: {
          username: 'testName',
          email: 'testemail@email.com',
          password: 'testPassword',
        }
      };

      User.create(user, function(err, createdUser){
        should.not.exist(err);
        should.exist(createdUser);

        expect(createdUser.local.username).to.equal('testName');
        expect(createdUser.local.email).to.equal('testemail@email.com');
        done();
      });
    });
  });

  describe('#hashPassword()', function(){
    it('it return a hash of the password', function(done){
      var password = ('secret');
      var hashedPassword = new User().hashPassword(password);
      expect(password).not.to.equal(hashedPassword);
      done();
    });
  });

  // Pending untill mongoose promise library workaround found
  describe('#validPassword()', function(){
    xit('it successfully compare the raw and hashed passwords', function(){
      let password = ('secret');
      let hashedPassword = new User().hashPassword(password);

    });

    xit('it unsuccessfully compare a fake and hashed password', function(){
      let password = ('secret');
      let fakePassword = ('fakePassword');

    });
  });
});
