const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const dBCleaner = require('../../helpers/DB/cleanDB');

module.exports = {

  before: (browser) => {
    signup(browser);
  },

  'User can visit Account page successfully': (browser) => {
    browser
    .click('.dropdown-toggle')
    .click('.account-link')
    .pause(1000)
    .assert.urlContains('/users/account')
    .assert.containsText('#username',
        'test_user');
  },

  afterEach: (done) => {
    dBCleaner(User, done);
  },

  after: (browser) => {
    browser
      .end();
  }
};
