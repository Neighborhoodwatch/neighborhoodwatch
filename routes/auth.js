module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		passport = settings.passport,
		router = express.Router();

	router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));

	router.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			message: 'Signed-in user. This is your profile.'
		});
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/github',passport.authenticate('github', { scope : 'email' }));

	router.get('/facebook',passport.authenticate('facebook', { scope : 'email' }));

	// GET /auth/github/callback
  // Use passport.authenticate() as route middleware to authenticate the
  // request.  If authentication fails, the user will be redirected back to the
  // login page.  Otherwise, the primary route function function will be called,
  // which, in this example, will redirect the user to the home page.
	app.get('/github/callback',
	  passport.authenticate('github', { failureRedirect: '/login' }),
	  function(req, res) {
	  	console.log('Github OAuth Callback');
	    res.redirect('/profile');
	  });

	app.get('/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {
	  	console.log('Facebook OAuth Callback');
	    res.redirect('/profile');
	  });

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/login');
	}

	app.use('/auth',router);
};
