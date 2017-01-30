const User    = require('../models/user.model');
const express = require('express');
const router  = express.Router();
const passport = require('passport');
const userModel = new User();

// GET Register
router.get('/register', function(req, res) {
  res.render('user/register');
});

// POST Register User
router.post('/register', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/users/register',
		failureFlash: true
}));

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
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}));

module.exports = router;
