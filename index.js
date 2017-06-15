const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
// const config = require('./config');
const path = require('path')
// const passport = require('passport');

// API Routes
const types = require('./routes/type');
const users = require('./routes/users');
const events = require('./routes/events');
const neighborhoods = require('./routes/neighborhood');
//const auth = require('./routes/auth');

//Database
const massive = require('massive');
let connectionString = process.env.DATABASE_URL || config.connectionString ||  "postgres://zacharyryanspringer@localhost/neighborhoodwatch";
let massiveInstance = massive.connectSync({connectionString})

//Application
var app = module.exports = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSIONSECRET || config.sessionSecret,
  resave: false,
  saveUninitialized: true
 }));

app.use(cors());

app.set('db', massiveInstance);
var db = app.get('db');
var uploader = require('./serverCtrls/uploadCtrl')(app);
app.use('/app/img', express.static(path.join(__dirname, 'uploads')));


//Middleware for putting user on express session
function userSession(req, res, next) {
  if(!req.session.user) {
    req.session.user = {}
  }
  next()
}
//middleware for putting users created and followed events and neighborhood on session
function userEandN(req, res, next) {
  if(!req.session.createdEvents) {
    req.session.createdEvents = []
  }
  if(!req.session.followedEvents) {
    req.session.followedEvents = []
  }
  if(!req.session.neighborhood) {
    req.session.neighborhood = {}
  }
  next()
}
//Middleware for checking if logged in
function isLoggedIn(req, res, next) {
  if(!req.session.isLoggedIn) {
    req.session.isLoggedIn = false
  }
  next()
}

//Authentication
// app.use(passport.initialize());
// app.use(passport.session());
// const auth = require('.routes/auth')(app, passport);

//API will be http://localhost/api/types, http://localhost/api/users, http://localhost/api/events, http://localhost:3000/api/neighborhoods etc. by using the prefix
let testCtrl = require('./serverCtrls/testCtrl');
app.use('/api', userSession, userEandN, isLoggedIn, types);
app.use('/api', userSession, userEandN, isLoggedIn, users);
app.use('/api', userSession, userEandN, isLoggedIn, events);
app.use('/api', userSession, userEandN, isLoggedIn, neighborhoods);
//app.use('/auth', userSession, userEandN, isLoggedIn, auth)
app.get('/whoami', function(req, res, done) {
  return res.send(req.session);
});
app.get('/logout', function(req, res, done) {
  req.session.destroy()
  return res.send(req.session);
});
app.get('/img', function(req, res, next) {
  res.send("uploads")
})
app.get('/updatedfacebook', function(req, res, next) {
    req.session.facebookUser = false
      res.send(req.session)
})
app.delete('/deletefacebook/:id', function(req, res, next) {
  var id = req.params.id
  db.delete_user(id, (err, resp) => {
    req.session.facebookUser = false
    if(err) {
      res.status(420).json(err)
    } else {
      res.send(req.session)
    }
  })
})
app.get('/facebookemail/:email', function(req, res, next) {
  db.get_user_email(req.params.email, (err, resp) => {
    if(err) {
      res.status(420).json(err)
    } else {
      res.send(resp)
    }
  })
})
//Passport code moved here for now...//
passport.serializeUser(function(user, done) {
      done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });
app.use(passport.initialize());
app.use(passport.session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));
//FACEBOOK
//NOTE: I have facebook setup to respond to API calls @: localhost:3005
    passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'https://neighborhoods.herokuapp.com/auth/facebook/callback',
    // callbackURL: 'http://localhost:3200/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
    },
    function(token, refreshToken, profile, done) {
      return done(null, profile)
        // db.get_facebook_user({facebook_id: profile.id}, function(err, user) {
        //     if (!user) {
        //         db.create_facebook_user([profile.displayName, profile.id],
        //
        //         function(err, user) {
        //             return done(err, user, {scope: 'all'});
        //         })
        //     } else {
        //     return done(err, user);
        //     }
        // })
    }));

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
                              failureRedirect: '/#!/login'
    }), function(req, res, next) {
            res.redirect('/authenticate/facebook')
    });
//google oAuth20
// look at this article before setting up the ID and SECRET
// https://github.com/mstade/passport-google-oauth2/blob/master/example/app.js
// then navigate here to obtain CLIENT_ID and SECRET: https://console.cloud.google.com/home/dashboard
////////////////////////////////////////////////
const port = process.env.PORT || config.PORT || 3000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
//
passport.use(new GoogleStrategy({
   clientID: GOOGLE_CLIENT_ID,
   clientSecret: GOOGLE_CLIENT_SECRET,
   callbackURL: 'https://neighborhoods.herokuapp.com/auth/google/callback'
 },
 function(accessToken, refreshToken, profile, done) {
   return done(null, profile)
 }
));
app.get('/auth/google',
 passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
 passport.authenticate('google', { failureRedirect: '/#!/login' }),
 function(req, res) {
   res.redirect('/authenticate/google');
 });
//google auth routes
app.get('/authenticate/google', userSession, userEandN, isLoggedIn, users)
//Facebook auth routes
app.get('/authenticate/facebook', userSession, userEandN, isLoggedIn, users)

app.listen(port, () => {
  console.log(`sup from port ${port}`);
})
