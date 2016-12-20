var express = require('express');
var router  = express.Router();

//Get profile page
router.get('/', function(req, res, next) {
  res.sendFile('profile.html', {root: './app/views'});
});

module.exports = router;
