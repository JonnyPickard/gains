module.exports = (browser) => {
  browser
    .verify.elementPresent('a[href=#logout]')
    .click('a[name=logout]')
    .assert.urlContains('/users/login');
};
