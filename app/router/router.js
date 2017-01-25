let users   = require('../controllers/users.js');
let index = require('../controllers/index.js');
let photo = require('../controllers/photo.js');

module.exports = function(app) {
  app.use('/users', users);
  app.use('/', index);
  app.use('/photo', photo);
};
