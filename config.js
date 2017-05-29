module.exports = {
  sessionSecret: "My Secret",
  PORT: 3005,
  connectionString: "postgres://ryanbryce@localhost/neighborhood",
  facebook: {
		clientID: '277945136009785',
	  clientSecret: '2f9ad1d3ed4c2bc4e538e469e3e16b57',
	  sessionSecret: 'some-random-string',
		callbackURL: 'http://localhost:3005/auth/facebook/callback'
	},
  google: {
    //https://cloud.google.com/nodejs/getting-started/authenticate-users
    //https://console.cloud.google.com/apis/credentials/consent?project=neighborhood-watch-169101
		clientID: 'neighborhood-watch-169101',
	  clientSecret: '',
	  sessionSecret: 'some-random-string',
		callbackURL: 'http://localhost:3005/auth/google/callback'
	},
  twitter: {
		clientID: '',
	  clientSecret: '',
	  sessionSecret: 'some-random-string',
		callbackURL: 'http://localhost:3005/auth/twitter/callback'
	}
}
