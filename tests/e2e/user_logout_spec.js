const config   = require('./helpers/e2eConfig.js');
const User     = require('../../app/models/user.model');
const server   = require('../../app');
const signup   = require('./helpers/signup.js');
const logout   = require('./helpers/logout.js');

const Browser = require('zombie');
Browser.localhost('gains.com', 3333);

describe('User clicks logout', function() {
  const browser = new Browser();

  afterEach(function() {
    return User.remove({}, function (err) {
      if (err) return handleError(err);
    });
  })

  describe('Log Out', function() {

    before(function(done) {
      signup(browser, done);
    });

    before(function(done) {
      logout(browser, done);
    });

    it('Should be successful', function() {
      browser.assert.success();
    });

    it('Should be redirected to the Login page', function() {
      browser.assert.text('title', 'Login');
    });
  });
});
