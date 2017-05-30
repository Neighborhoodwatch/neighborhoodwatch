module.exports = function(app, passport){
	var users = require('../serverCtrls/usersCtrl');
	var express = require('express');
	var router = express.Router();

	app.route('/auth/signup', users.signup);
	app.route('/auth/signin/:username/:password', users.signin);
	app.route('/auth/signout', users.signout);


	//Facebook routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {scope: ['email']}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	//Twitter routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	//Google routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));

	app.param('userid', users.userById);

	// used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });
};
