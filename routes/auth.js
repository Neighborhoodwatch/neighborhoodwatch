const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const app = express();
const users = require('../serverCtrls/usersCtrl');
	
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });
    passport.use(new FacebookStrategy({
    clientID: '448384402181550',
    clientSecret: 'cc01914586c904f7ecdef4daa544c066',
    callbackURL: 'http://localhost:3005/auth/facebook/callback',
    profileFields: ['id', 'displayName']
    }, 
    function(token, refreshToken, profile, done) {
        console.log('facebook')
        db.getUserByFacebookId([profile.id], function(err, user) {
            if (!user) {
                console.log('CREATING USER');
                db.createUserFacebook([profile.displayName, profile.id], function(err, user) {
                    return done(err, user, {scope: 'all'});
                })
            } else {
            return done(err, user);
            }
        })
    }));

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { 
                              failureRedirect: '/#/failureLogin'
    }), function(req, res, next) {
            res.redirect('/')
    });

	//Facebook routes
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/#/login'
        }));

	//Twitter routes
//	router.get('/auth/twitter').get(passport.authenticate('twitter'));
//	router.get('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	//Google routes
//	router.get('/auth/google').get(passport.authenticate('google', {
//		scope: [
//			'https://www.googleapis.com/auth/userinfo.profile',
//			'https://www.googleapis.com/auth/userinfo.email'
//		]
//	}));
//	router.get('/auth/google/callback').get(users.oauthCallback('google'));

//	app.param('userid', users.userById);

	// used to serialize the user for the session
//    router.get('/auth/signup', users.signup);
//	router.get('/auth/signin/:username/:password', users.signin);
//	router.get('/auth/signout', users.signout);