// const config   = require('./helpers/e2eConfig.js');
// const User     = require('../../app/models/user.model');
// const server   = require('../../app');
// const signup   = require('./helpers/signup.js');
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
//     it('Should be successful', function() {
//       browser.assert.success();
//     });
//
//     it('Should be redirected to profile page', function() {
//       browser.assert.text('title', 'Profile');
//     });
//   });
// });
