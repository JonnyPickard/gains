const config   = require('../helpers/config/e2e.js');
const User     = require('../../../app/models/user.model');
const server   = require('../../../app');
const signup   = require('../helpers/users/signup.js');
const DBCleaner = require('../helpers/cleanDB');

module.exports = {

  before: function(browser) {
    signup(browser);
  },

  'User Log Out is successful': function(browser) {
    browser
    .click("#logout")
    .assert.urlContains('/users/login');
  },

  afterEach: function(done) {
    DBCleaner(User, done);
  },

  after: function(browser) {
    browser
      .end();
  }
}
