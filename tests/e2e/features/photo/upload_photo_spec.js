const config   = require('../../../config/test.config.js');
const User     = require('../../../../app/models/user.model');
const Photo     = require('../../../../app/models/photo.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const userDBCleaner = require('../../../helpers/clean_user_db_helper.js');
const photoDBCleaner = require('../../../helpers/clean_photo_db_helper.js');

module.exports = {

  before: (browser) => {
    signup(browser);
  },

  'Photo upload is successful': (browser) => {
    browser
    .click('.dropdown-toggle')
    .click('.upload-link')
    .pause(1000)
    .assert.urlContains('/upload')
    .setValue('input[name=photo_name]', 'test_photo')
    .setValue('input#file-input',
      require('path').resolve(__dirname + '/arnold.jpg'))
    .waitForElementVisible('input#upload-button', 5000)
    .click('input#upload-button')
    .pause(1000)
    .assert.title('index')
    .assert.containsText('.img-belongs-to', 'test_user')
    .assert.attributeContains('.user-avatar',
     'src',
     '/images/blank-avatar.png')
    .assert.containsText('.img-title', 'test_photo');
  },

  afterEach: () => {
    userDBCleaner();
    photoDBCleaner();
  },

  after: (browser) => {
    browser
      .end();
  }
};
