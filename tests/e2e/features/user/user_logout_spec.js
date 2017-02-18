const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const dBCleaner = require('../../helpers/DB/cleanDB');

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

  afterEach: (done) => {
    dBCleaner(User, done);
  },

  after: (browser) => {
    browser
      .end();
  }
};
