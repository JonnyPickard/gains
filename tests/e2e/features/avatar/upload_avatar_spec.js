const config   = require('../../../config/test.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const userDBCleaner = require('../../../helpers/clean_user_db_helper.js');

module.exports = {

  before: (browser) => {
    signup(browser);
  },

  'Avatar upload is successful': (browser) => {
    browser
    .click('.dropdown-toggle')
    .click('.account-link')
    .pause(1000)
    .assert.urlContains('/account')
    .setValue('input#file-input',
     require('path').resolve(__dirname + '/arnold2.jpg'))
    .waitForElementVisible('input#uploadButton', 5000)
    .click('input#uploadButton')
    .pause(1000)
    .assert.title('account')
    .assert.attributeContains('#avatar',
     'src',
     'https://gains-test.s3.amazonaws.com/Avatar_arnold2.jpg');
  },

  afterEach: () => {
    userDBCleaner();
  },

  after: (browser) => {
    browser
      .end();
  }
};
