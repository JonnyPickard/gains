const index   = require('../controllers/index.js');
const users   = require('../controllers/users.js');
const photo   = require('../controllers/photo.js');

module.exports = function(app) {
  app.use('/', index);
  app.use('/users', users);
  app.use('/photo', photo);
};
