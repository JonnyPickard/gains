const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const DBCleaner = require('../../helpers/DB/cleanDB');

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
