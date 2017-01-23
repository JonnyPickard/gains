module.exports = function signup(browser, done) {
  browser
    .fill('username', 'test_user')
    .fill('email',    'test@test.com')
    .fill('password', 'password')
    .pressButton('Sign Up', done);
};
