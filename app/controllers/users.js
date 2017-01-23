const express = require('express');
const router  = express.Router();
const User    = require('../models/user.model');
const rootUser = {root: './app/views/user'};

//GET signup page.
router.get('/register', function(req, res) {
  res.render('user/register');
});

//Post create new user
router.post('/register', function(req, res) {
  User.create(req.body, function(err) {
    if (err) {
      console.log(err);
      res.redirect('/users/register');
    } else {
      res.redirect('/');
    }
  });
});

router.post('/logout', function(req, res) {
  res.redirect('/users/login')
});

router.get('/login', function(req, res) {
  res.render('user/login')
});

router.post('/login', function(req, res) {
  res.redirect('/');
});

module.exports = router;
