module.exports = function signup(browser, done) {
  browser.visit('/users/register', function() {
    browser
    .fill('username', 'test_user')
    .fill('email',    'test@test.com')
    .fill('password', 'password')
    .fill('password2', 'password')
    .pressButton('Sign Up', done);
  });
};
