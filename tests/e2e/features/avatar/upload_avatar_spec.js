const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const DBCleaner = require('../../helpers/DB/cleanDB');

module.exports = {

  before: function(browser) {
    signup(browser);
  },

  'Avatar upload is successful': function(browser) {
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

  afterEach: function(done) {
    new DBCleaner(User, done);
  },

  after: function(browser) {
    browser
      .end();
  }
};
