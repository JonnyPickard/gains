const config   = require('../helpers/config/e2e.js');
const User     = require('../../../app/models/user.model');
const server   = require('../../../app');
const signup   = require('../helpers/users/signup.js');
const DBCleaner = require('../helpers/cleanDB');

// const logout   = require('../helpers/logout.js');
//
// const Browser = require('zombie');
// Browser.localhost('gains.com', 3333);
//
// describe('User clicks logout', function() {
//   const browser = new Browser();
//
//   afterEach(function() {
//     DBCleaner(User, done);
//   });
//
//   describe('Log Out', function() {
//
//     before(function(done) {
//       signup(browser, done);
//     });
//
//     before(function(done) {
//       logout(browser, done);
//     });
//
//     it('Should be successful', function() {
//       browser.assert.success();
//     });
//
//     it('Should be redirected to the Login page', function() {
//       browser.assert.text('title', 'login');
//     });
//   });
// });

module.exports = {

  before: function(browser) {
    signup(browser);
  },

  'User Log Out is successful': function(browser) {
    browser
    .click("#logout")
    .assert.urlContains('/users/login');
  },

  afterEach: function(done) {
    DBCleaner(User, done);
  },

  after: function(browser) {
    browser
      // .end();
  }
}
