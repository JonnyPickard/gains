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
  req.flash('success_msg', 'Successfully logged in');
  res.render('user/login');
});

// POST Login
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}));

// GET Create form - After login via oauth
router.get('/create', function(req, res){
  if (!req.session.username) {
    res.render('user/create');
  } else {
    req.flash('success_msg', 'Success');
    res.redirect('/');
  }
});

// GET Account
router.get('/account', function(req, res){
  res.render('user/account');
});

module.exports = router;
