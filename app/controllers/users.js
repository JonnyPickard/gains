var express = require('express');
var router  = express.Router();
var User    = require('../models/user.model');
const rootUser = {root: './app/views/user'};

//GET signup page.
router.get('/signup', function(req, res) {
  res.sendFile('signup.html', rootUser);
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

router.post('/logout', function(req, res) {
  res.redirect('/users/login')
});

router.get('/login', function(req, res) {
  res.sendFile('login.html', rootUser)
});

router.post('/login', function(req, res) {
  res.redirect('/profile');
});

module.exports = router;
