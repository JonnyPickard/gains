const express   = require('express');
const router    = express.Router();
const passport  = require('passport');

// Facebook
router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback',
  passport.authenticate('facebook',
                       { failureRedirect: '/users/login',
                         successRedirect: '/users/create' }));

// Connecting facebook account
router.get('/connect-facebook', passport.authorize('facebook', { scope: 'email' }));

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', { successRedirect: '/users/create',
                                      failureRedirect: '/users/login' }));


// Connect google account
router.get('/connect-google', passport.authorize('google', { scope: ['profile', 'email'] }));

module.exports = router;
