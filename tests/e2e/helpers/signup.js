module.exports = function signup(browser, done) {
  browser.visit('/users/signup', function() {
    browser
    .fill('username', 'test_user')
    .fill('email',    'test@test.com')
    .fill('password', 'password')
    .pressButton('Sign Up', done);
  });
};
