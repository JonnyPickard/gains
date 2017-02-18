const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const dBCleaner = require('../../helpers/DB/cleanDB');

module.exports = {

  'User Registration is successful': (browser) => {
    signup(browser);
  },

  afterEach: (done) => {
    dBCleaner(User, done);
  },

  after: (browser) => {
    browser
      .end();
  }
};
