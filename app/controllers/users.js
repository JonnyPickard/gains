const User    = require('../models/user.model');
const express = require('express');
const router  = express.Router();
const passport = require('passport');
const validator = require('./helpers/validator');
const userModel = new User();

// GET Register
router.get('/register', function(req, res) {
  res.render('user/register');
});

// POST Register User
router.post('/register', function(req, res) {
  let errors = validator(req);

  if(errors) {
    res.render('user/register', {
      errors: errors
    });
  } else {
    User.create(req.body, function(err, user) {
      if (err) {
        req.flash('error_msg', 'A user with these details already exists');
        res.redirect('register');
      } else {
        passport.authenticate('local')(req, res, function () {
          req.flash('success_msg', 'Welcome! You have successfully registered');
          res.redirect('/');
        });
      }
    });
  }
});

// POST Logout
router.post('/logout', function(req, res) {
  req.logout();

  req.flash('success_msg', 'Successfully logged out');

  res.redirect('/users/login');
});

// GET Login
router.get('/login', function(req, res) {
  res.render('user/login');
});


// POST Login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    // failureFlash: true   Was sending flash [Object object] after success
  }),
  function(req, res){
    res.redirect('/');
  }
);

module.exports = router;
