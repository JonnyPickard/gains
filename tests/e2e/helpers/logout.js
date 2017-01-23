module.exports = function logout(browser, done) {
  browser.assert.text('title', 'index');
  browser.pressButton('Logout', done);
};
