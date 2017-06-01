const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors');
const config = require('./config');
// const passport = require('passport');

// API Routes
const types = require('./routes/type');
const users = require('./routes/users');
const events = require('./routes/events');
const neighborhoods = require('./routes/neighborhood');
//const auth = require('./routes/auth');

//Database
const massive = require('massive');
let connectionString = config.connectionString ||  "postgres://zacharyryanspringer@localhost/neighborhoodwatch";
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
// app.use('/img', express.static(path.join(__dirname, 'uploads')));


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
    req.session.createdEvents = {}
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
    passport.use(new FacebookStrategy({
    clientID: '448384402181550',
    clientSecret: 'cc01914586c904f7ecdef4daa544c066',
    callbackURL: 'http://localhost:3005/auth/facebook/callback',
    profileFields: ['id', 'displayName']
    },
    function(token, refreshToken, profile, done) {
        console.log('facebook profile', profile)
        db.get_facebook_user({facebook_id: profile.id}, function(err, user) {
            if (!user) {
                console.log('CREATING USER:');
                db.create_facebook_user([profile.displayName, profile.id],

                function(err, user) {
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



const port = process.env.PORT || config.PORT || 3000;
app.listen(port, () => {
  console.log(`sup from port ${port}`);
})
