var passport = require('passport');
var url = require('url');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var users = require('../serverCtrls/usersCtrl');

module.exports = function () {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'name.givenName', 'name.familyName', 'email', 'username']
  }, function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      username: profile.username,
      provider: 'facebook',
      providerIdentifierField: 'id',
      providerData: providerData
    };

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }
));
}
