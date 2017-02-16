const User = require('../../../app/models/user.model.js');

module.exports = function() {
  User.remove({}, function (err) {
    if (err) { return handleError(err); }
  });
};
