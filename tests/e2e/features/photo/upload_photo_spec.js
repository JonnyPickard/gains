const config   = require('../../config/e2e.config.js');
const User     = require('../../../../app/models/user.model');
const Photo     = require('../../../../app/models/photo.model');
const server   = require('../../../../app');
const signup   = require('../../helpers/users/signup.js');
const DBCleaner = require('../../helpers/DB/cleanDB');

module.exports = {

  before: function(browser) {
    signup(browser);
  },

  'Photo upload is successful': function(browser) {
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

  afterEach: function(done) {
    new DBCleaner(User, done);
    new DBCleaner(Photo, done);
  },

  after: function(browser) {
    browser
      .end();
  }
};
