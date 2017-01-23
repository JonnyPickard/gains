module.exports = function logout(browser, done) {
  browser.assert.text('title', 'Profile');
  browser.pressButton('Logout', done);
};
