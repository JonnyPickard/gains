var express = require('express');
var router = express.Router();
var User   = require('../models/user.model');

//GET signup page.
router.get('/signup', function(req, res, next) {
  res.sendFile('signup.html', {root: './app/views/user'});
});

//Post create new user
router.post('/signup', function(req, res, next){
  User.create(req.body, function(err, createdUser){
    if (err) {
      console.log(err);
      res.redirect('/users/signup');
    } else {
      res.redirect('/profile');
    }
  });
});

module.exports = router;
