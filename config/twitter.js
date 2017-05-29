var passport = require('passport');
var url = require('url');
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('../config');
var users = require('..serverCtrls/usersCtrl');

module.exports = function () {

passport.use(new TwitterStrategy({
    clientID: config.twitter.clientID,
    clientSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL
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
      providerIdentifierField: 'id', 
      providerData: providerData
    }

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }
));
}
