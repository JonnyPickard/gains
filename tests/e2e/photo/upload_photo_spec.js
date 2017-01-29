// const config   = require('../helpers/e2eConfig.js');
// const server   = require('../../../app');
// const User     = require('../../../app/models/user.model');
// const Photo     = require('../../../app/models/photo.model');
// const signup   = require('../helpers/signup.js');
//
// const Browser = require('zombie');
// Browser.localhost('gains.com', 3333);
//
// describe('User visits photo upload page', function() {
//   const browser = new Browser();
//
//   afterEach(function() {
//     User.remove({}, function (err) {
//       if (err) return handleError(err);
//     });
//     Photo.remove({}, function (err) {
//       if (err) return handleError(err);
//     });
//   });
//
//   describe('Upload Photo', function(){
//
//     before(function(done) {
//       signup(browser, done);
//     });
//
//     before(function(done) {
//       browser.visit('/photo/upload', function() {
//         browser.fill('photo_name', 'test_photo')
//         .pressButton('Upload', done);
//       });
//     });
//
//     it('Should be successful', function() {
//       browser.assert.success();
//     });
//
//     it('Should be redirected to index page', function() {
//       browser.assert.text('title', 'index');
//     });
//   })
// });
