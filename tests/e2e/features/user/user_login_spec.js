const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const dBCleaner = require('../../helpers/DB/cleanDB');

module.exports = {

  before: (browser) => {
    signup(browser);
    browser
      .click('.dropdown-toggle')
      .click('#logout')
      .assert.urlContains('/users/login');
  },

  'User Log In is successful': (browser) => {
    browser
    .setValue('input[name=username]', 'test_user')
    .setValue('input[name=password]', 'password')
    .setValue('input[name=email]', 'test@test.com')
    .click('.submit-login')
    .pause(1000)
    .assert.urlContains('/')
    .assert.title('index');
  },

  afterEach: (done) => {
    dBCleaner(User, done);
  },

  after: (browser) => {
    browser
      .end();
  }
};
