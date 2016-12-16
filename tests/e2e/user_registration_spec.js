const Browser = require('zombie');

Browser.localhost('gains.com', 3000);

describe('User visits signup page', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/users/signup', done);
  });

  describe('submits form', function() {

    before(function(done) {
      browser
        .fill('username', 'test_user')
        .fill('email',    'test@test.com')
        .fill('password', 'password')
        .pressButton('Sign Up', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('title', 'Profile');
    });
  });
});
