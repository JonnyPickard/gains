module.exports = function signup(browser) {
  browser
    .url('http://localhost:3333/users/register')
    .waitForElementVisible('body', 1000)
    .assert.title('register')
    .setValue('input[name=username]', 'test_user')
    .setValue('input[name=password]', 'password')
    .setValue('input[name=password2]', 'password')
    .setValue('input[name=email]', 'test@test.com')
    .click('.submit-register')
    .pause(1000);
};
