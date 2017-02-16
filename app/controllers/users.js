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
    res.render('user/create', {msg: 'Create User form'});
  } else {
    req.flash('success_msg', 'Success');
    res.redirect('/');
  }
});

// GET Account
router.get('/account', function(req, res){
  res.render('user/account');
});

// GET Username + avatarURL
router.get('/user', function(req, res){
  let userId = req.query.userId;
  let user = new User();

  user.getUserByUserId({userId: userId}, function(err, user) {
    res.setHeader('Content-Type', 'application/json');
    if(err) { throw err; }
    if(!user) {
      res.status(500)
      .send(JSON.stringify('User could not be found!'));
    }
    if(user) {
      res.send({username: user.local.username, avatarURL: user.avatarURL});
    }
  });
});

module.exports = router;
