const config   = require('../../../config/test.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const userDBCleaner = require('../../../helpers/clean_user_db_helper.js');

module.exports = {

  'User Registration is successful': (browser) => {
    signup(browser);
  },

  afterEach: () => {
    userDBCleaner();
  },

  after: (browser) => {
    browser
      .end();
  }
};
