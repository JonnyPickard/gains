const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const secrets          = require('./secrets/secrets');
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
const formValidator    = require('./validator_signup_form');

const User             = require('../models/user.model');
const userModel        = new User();

module.exports = (passport) => {

  // Passport Local Login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    emailField: 'email',
    passReqToCallback: true
  },
  (req, username, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.username': username}, (err, user) => {
        if(err) { return done(err); }
        if(!user) {
          return done(null, false, req.flash('error_msg', 'No user found'));
        }
        user.validPassword(password, user.local.password, (err, result) => {
          if (err) { return done(err); }
          if (result === false) {
            return done(null, false, req.flash('error_msg',
                                               'Invalid password'));
          } else {
            return done(null, user);
          }
        });
      });
    });
  }));

  // Passport Local SignUp Strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    emailField: 'email',
    passReqToCallback: true
  },
  (req, username, password, done) => {
    let errors = formValidator(req);
    if(errors) { return done(errors); }

    process.nextTick(() => {
      User.findOne({'local.username': username}, (err, user) => {
        if(err) { return done(err); }
        if(user){
          return done(null, false, req.flash('error_msg',
            'A user with these details already exists'));
        }
        if(!req.user) {
          let newUser = new User();
          newUser.local.username = username;
          newUser.local.email = req.body.email;
          newUser.local.password = newUser.hashPassword(password);

          newUser.save((err) => {
            if(err) { throw err; }
            return done(null, newUser);
          });
        } else {
          let user = req.user;
          user.local.username = req.body.username;
          user.local.email = req.body.email;
          user.local.password = user.hashPassword(password);

          user.save((err) => {
            if(err) { throw err; }
            return done(null, user);
          });
        }
      });
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: secrets.facebookAppId || '1860458620897454',
    clientSecret: secrets.facebookAppSecret ||
      '6525b5d5c375396668aa74938c0f08dd',
    callbackURL: process.env.FACEBOOK_CALLBACK ||
      'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    req.session.loginType = 'facebook';
    process.nextTick(() => {
      // Create new User
      if(!req.user) {
        User.findOne({ 'facebook.id': profile.id }, (err, user) => {
          if(err) { return done(err); }
          if(user) {
            req.session.username = user.local.username;
            return done(null, user);
          } else {
            let newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.displayName;
            newUser.save((err) => {
              if(err) { throw err; }
              return done(null, newUser);
            });
          }
        });

        // Merge with existing User
        } else {
          let user = req.user;
          req.session.username = user.local.username;
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;
          user.facebook.name = profile.displayName;

          user.save((err) => {
            if(err) { throw err; }
            return done(null, user);
          });
        }
      });
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: secrets.googleAuth.clientID,
    clientSecret: secrets.googleAuth.clientSecret,
    callbackURL: secrets.googleAuth.callbackURL,
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      // Create new User
      if(!req.user) {
        User.findOne({'google.id': profile.id}, (err, user) => {
          if(err) { return done(err); }
          req.session.loginType = 'google';
          if(user) {
            req.session.username = user.local.username;
            return done(null, user);
          } else {
            let newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;

            newUser.save((err) => {
              if(err) { throw err; }
              return done(null, newUser);
            });
          }
        });

          // Merge with existing User
        } else {
          let user = req.user;
          req.session.username = user.local.username;
          user.google.id = profile.id;
          user.google.token = accessToken;
          user.google.name = profile.displayName;
          user.google.email = profile.emails[0].value;

          user.save((err) => {
            if(err) { throw err; }
            return done(null, user);
          });
        }
      });
    }
  ));

  // Passport User serialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userModel.getUserById(id, (err, user) => {
      done(err, user);
    });
  });
};
