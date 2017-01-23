const express = require('express');
const router  = express.Router();
const User    = require('../models/user.model');
const rootUser = {root: './app/views/user'};

// GET Register
router.get('/register', function(req, res) {
  res.render('user/register');
});

// POST Register User
router.post('/register', function(req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let password2 = req.body.password2;

  // Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors) {
    res.render('user/register', {
      errors: errors
    });
  } else {
    res.redirect('/');
  }

  // User.create(req.body, function(err) {
  //   if (err) {
  //     console.log(err);
  //     res.redirect('/users/register');
  //   } else {
  //     res.redirect('/');
  //   }
  // });
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
