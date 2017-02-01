require('../helpers/config/e2e.js');
const config   = require('../../nightwatch.config.js');
const User     = require('../../../app/models/user.model');
const server   = require('../../../app');
const signup   = require('../helpers/users/signup.js');
const DBCleaner = require('../helpers/cleanDB');

module.exports = {

  'User Registration is successful': function(browser) {
    signup(browser);
  },

  afterEach: function(done) {
    DBCleaner(User, done);
  },

  after: function(browser) {
    browser
      .end();
  }
}
