const User = require('../../app/models/user.model.js');

module.exports = () => {
  User.remove({}, () => {});
};
