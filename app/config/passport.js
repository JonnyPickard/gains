const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const secrets = require('./secrets/secrets');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User    = require('../models/user.model');
const userModel = new User();

module.exports = function(passport) {
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

  passport.use(new FacebookStrategy({
	    clientID: secrets.facebookAppId || "1860458620897454",
	    clientSecret: secrets.facebookAppSecret || "6525b5d5c375396668aa74938c0f08dd",
	    callbackURL: process.env.FACEBOOK_CALLBACK || "http://localhost:3000/auth/facebook/callback"
	  },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
          User.findOne({'facebook.id': profile.id}, function(err, user){
          	if(err)
          		return done(err);
          	if(user)
          		return done(null, user);
          	else {
          		var newUser = new User();
          		newUser.facebook.id = profile.id;
          		newUser.facebook.token = accessToken;
          		newUser.facebook.name = profile.displayName;
          		newUser.save(function(err){
          			if(err)
          				throw err;
          			return done(null, newUser);
          		})
          		console.log(profile);
          	}
          });
        });
      }

  ));

  passport.use(new GoogleStrategy({
	    clientID: secrets.googleAuth.clientID,
	    clientSecret: secrets.googleAuth.clientSecret,
	    callbackURL: secrets.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'google.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				newUser.google.id = profile.id;
	    				newUser.google.token = accessToken;
	    				newUser.google.name = profile.displayName;
	    				newUser.google.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }

	));
}
