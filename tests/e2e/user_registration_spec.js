process.env.NODE_ENV = 'test';

let User     = require('../../app/models/user.model');
let server   = require('../../app');

const Browser = require('zombie');
Browser.localhost('gains.com', 3000);

describe('User visits signup page', function() {
  const browser = new Browser();

  afterEach(function() {
    return User.remove({}, function (err) {
      if (err) return handleError(err);
    });
  })

  describe('Sign Up', function() {
    before(function(done) {
      browser.visit('/users/signup', done);
    });

    before(function(done) {
      browser
        .fill('username', 'test_user')
        .fill('email',    'test@test.com')
        .fill('password', 'password')
        .pressButton('Sign Up', done);
    });

    it('Should be successful', function() {
      browser.assert.success();
    });

    it('Should be redirected to profile page', function() {
      browser.assert.text('title', 'Profile');
    });
  });
});
