const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const DBCleaner = require('../../helpers/DB/cleanDB');

module.exports = {

  before: function(browser) {
    signup(browser);
  },

  'User can visit Account page successfully': function(browser) {
    browser
    .click('.account-link')
    .pause(1000)
    .assert.urlContains('/users/account')
    .assert.containsText('#username',
        'test_user');
  },

  afterEach: function(done) {
    new DBCleaner(User, done);
  },

  after: function(browser) {
    browser
      .end();
  }
};
