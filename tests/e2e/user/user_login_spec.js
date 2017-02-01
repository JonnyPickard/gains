const config   = require('../helpers/config/e2e.js');
const User     = require('../../../app/models/user.model');
const server   = require('../../../app');
const signup   = require('../helpers/users/signup.js');
const DBCleaner = require('../helpers/cleanDB');

module.exports = {

  before: function(browser) {
    signup(browser);
    browser
      .click("#logout")
      .assert.urlContains('/users/login');
  },

  'User Log In is successful': function(browser) {
    browser
    .setValue('input[name=username]', 'test_user')
    .setValue('input[name=password]', 'password')
    .setValue('input[name=email]', 'test@test.com')
    .click('.login')
    .pause(1000)
    .assert.urlContains('/')
    .assert.title('index');
  },

  afterEach: function(done) {
    DBCleaner(User, done);
  },

  after: function(browser) {
    browser
      .end();
  }
};
