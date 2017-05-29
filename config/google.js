var passport = require('passport');
var url = require('url');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('../config');
var users = require('..serverCtrls/usersCtrl');

module.exports = function () {

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    var providerUserProfile = {
      firstName: '',
      lastName: '',
      displayName: profile.displayName,
      email: profile.emails[0].value,
      username: '',
      provider: 'google',
      providerIdentifierField: 'id', //{ googleId: profile.id }
      providerData: providerData
    }

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }
));
}

/*
router.get(
  // Login url
  '/auth/login',

  // Save the url of the user's current page so the app can redirect back to
  // it after authorization
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },

  // Start OAuth 2 flow using Passport.js
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
*/
