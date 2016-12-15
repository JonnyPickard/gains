var utils  = require('../utils/mongodb_cleaner');
var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();
var User   = require('../../app/models/user.model');
console.log(User);

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
        expect(createdUser.password).to.equal('testPassword');
        expect(createdUser.email).to.equal('testemail@email.com');
        expect(createdUser.user_id).to.equal(1);
        done();
      });
    });

    it('should validate required attributes exist', function() {
      // Should throw errors if attributes arent given to the create function
      var user = {
        username: 'name'
      };

      User.create(user, function(err, createdUser){
        should.exist(err);
        // console.log(err.errors);
        done();
      })
    });
  });
});
