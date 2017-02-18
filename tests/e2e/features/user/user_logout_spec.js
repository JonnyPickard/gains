const config   = require('../../../config/test.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const userDBCleaner = require('../../../helpers/clean_user_db_helper.js');

module.exports = {

  before: (browser) => {
    signup(browser);
  },

  'User Log Out is successful': (browser) => {
    browser
    .click('.dropdown-toggle')
    .click('#logout')
    .assert.urlContains('/users/login');
  },

  afterEach: () => {
    userDBCleaner();
  },

  after: (browser) => {
    browser
      .end();
  }
};
