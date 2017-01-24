const User    = require('../models/user.model');
const express = require('express');
const router  = express.Router();
const rootUser = {root: './app/views/user'};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
    User.create(req.body, function(err) {
      if (err) {
        req.flash('error_msg', 'A user with these details already exists');
        res.redirect('register');
      } else {
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/');
      }
    });
  }
});

// POST Logout
router.post('/logout', function(req, res) {
  res.redirect('/users/login')
});

// GET Login
router.get('/login', function(req, res) {
  res.render('user/login')
});

// Passport local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    userModel.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      userModel.comparePasswords(password, user.password, function(err, isMatch){
        if(err) throw err;

        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userModel.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// POST Login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res){
    res.redirect('/');
  }
);

module.exports = router;
