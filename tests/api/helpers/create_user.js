const User = require('../../../app/models/user.model.js');

module.exports = () => {
  let newUser = new User();

  newUser.userId = 5;
  newUser.local.username = 'test_user';
  newUser.local.email = 'test@test.com';
  newUser.local.password = newUser.hashPassword('test_password');

  newUser.save((err) => {
    if(err) { throw err; }
    console.log('Create User');
    return (null, newUser);
  });
};
