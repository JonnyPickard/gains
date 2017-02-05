// const config   = require('../../config/e2e.config.js');
// const User     = require('../../../../app/models/user.model');
// const server   = require('../../../../app');
// const signup   = require('../../helpers/users/signup.js');
// const DBCleaner = require('../../helpers/DB/cleanDB');
//
// module.exports = {
//
//   before: function(browser) {
//     signup(browser);
//   },
//
//   'User Account Edit is successful': function(browser) {
//     browser
//     .click('a[name=account-link]')
//     .pause(1000)
//     .assert.urlContains('/account')
//     .click('a[name=account-edit]')
//     .setValue('input[name=family_name]', 'first')
//     .setValue('input[name=given_name]', 'last')
//     .click('input#update-account-button')
//     .pause(1000)
//     .assert.urlContains('/account')
//     .assert.title('account')
//     .assert.containsText('#given_name',
//         'first')
//     .assert.containsText('#family_name',
//         'last');
//   },
//
//   afterEach: function(done) {
//     new DBCleaner(User, done);
//   },
//
//   after: function(browser) {
//     browser
//       .end();
//   }
// };
