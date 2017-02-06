const index    = require('../controllers/index.js');
const users    = require('../controllers/users.js');
const photo    = require('../controllers/photo.js');
const avatar   = require('../controllers/avatar.js');
const auth     = require('../controllers/auth.js');

module.exports = function(app) {
  app.use('/', index);
  app.use('/users', users);
  app.use('/photo', photo);
  app.use('/auth', auth);
  app.use('/avatar', avatar);
};
