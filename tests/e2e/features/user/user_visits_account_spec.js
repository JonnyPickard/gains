const config   = require('../../../config/test.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const userDBCleaner = require('../../../helpers/clean_user_db_helper.js');

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

  afterEach: () => {
    userDBCleaner();
  },

  after: (browser) => {
    browser
      .end();
  }
};
