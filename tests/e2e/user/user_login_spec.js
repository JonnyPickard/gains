// require('../helpers/e2eConfig.js');
// const User     = require('../../../app/models/user.model');
// const server   = require('../../../app');
// const signup   = require('../helpers/signup.js');
// const logout   = require('../helpers/logout.js');
//
// const Browser = require('zombie');
// Browser.localhost('gains.com', 3333);
//
// describe('User visits login page', function() {
//   const browser = new Browser();
//
//   afterEach(function() {
//     return User.remove({}, function (err) {
//       if (err) return handleError(err);
//     });
//   })
//
//   describe('Log In', function() {
//
//     before(function(done) {
//       signup(browser, done);
//     });
//
//     before(function(done) {
//       logout(browser, done);
//     });
//
//     before(function(done) {
//       browser.fill('username', 'test_user')
//           .fill('email',    'test@test.com')
//           .fill('password', 'password')
//           .pressButton('Login', done);
//     });
//
//     it('Should be successful', function() {
//       browser.assert.success();
//     });
//
//     it('Should be redirected to index page', function() {
//       browser.assert.text('title', 'index');
//     });
//   });
// });
