process.env.NODE_ENV = 'test';

var dbCleaner  = require('../../utils/mongodb_cleaner');
var chai       = require('chai');
var expect     = chai.expect;
var should     = chai.should();
var User       = require('../../../app/models/user.model');

describe("User", function() {

  describe("#create()", function(){
    it('should create a new user', function(done){
      var user = {
        username: 'testName',
        email: 'testemail@email.com',
        password: 'testPassword',
        user_id: 1
      };

      User.create(user, function(err, createdUser){
        should.not.exist(err);
        should.exist(createdUser);

        expect(createdUser.username).to.equal('testName');
        expect(createdUser.email).to.equal('testemail@email.com');
        expect(createdUser.user_id).to.equal(1);
        done();
      });
    });
  });

  describe('#hashPassword()', function(){
    it('should return a hash of the password', function(done){
      var password = ('secret');
      var hashedPassword = User().hashPassword(password);
      expect(password).not.to.equal(hashedPassword);
      done();
    });
  });

  describe('#comparePasswords()', function(){
    it('should successfully compare the raw and hashed passwords', function(){
      let password = ('secret');
      let hashedPassword = User().hashPassword(password);

      User().comparePasswords(password, hashedPassword, function(err, isMatch){
        expect(isMatch).to.equal(true);
      });
    });

    it('should unsuccessfully compare a fake and hashed password', function(){
      let password = ('secret');
      let fakePassword = ('fakePassword');

      let hashedPassword = User().hashPassword(password);

      User().comparePasswords(fakePassword, hashedPassword, function(err, isMatch){
        expect(isMatch).to.equal(false);
      });
    });
  });
});
