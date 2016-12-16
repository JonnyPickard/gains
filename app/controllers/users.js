var express = require('express');
var router = express.Router();

//GET signup page.
router.get('/signup', function(req, res, next) {
  res.sendFile('signup.html', {root: './app/views/user'});
});

//Post create new user
router.post('/signup', function(req, res, next){
  res.redirect('/profile');
});

module.exports = router;
