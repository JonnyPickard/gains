var express = require('express');
var router  = express.Router();
var User    = require('../models/user.model');

//GET signup page.
router.get('/signup', function(req, res) {
  res.sendFile('signup.html', {root: './app/views/user'});
});

//Post create new user
router.post('/signup', function(req, res) {
  User.create(req.body, function(err) {
    if (err) {
      console.log(err);
      res.redirect('/users/signup');
    } else {
      res.redirect('/profile');
    }
  });
});

module.exports = router;
