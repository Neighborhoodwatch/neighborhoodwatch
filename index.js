const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
// const passport = require('passport');

// API Routes
const types = require('./routes/type');
const users = require('./routes/users');
const events = require('./routes/events');
const neighborhoods = require('./routes/neighborhood');

//Database
const massive = require('massive');
let connectionString = process.env.DATABASE_URL || config.connectionString ||  "postgres://postgres:postgres@localhost/neighborhood";
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

// app.use('/images', express.static(path.join(__dirname, 'uploads')));



//Middleware for putting user on express sessionSecret
function userSession(req, res, next) {
  if(!req.user) {
    req.user = {}
  }
  next()
}
//Authentication
// app.use(passport.initialize());
// app.use(passport.session());
// const auth = require('.routes/auth')(app, passport);

//API will be http://localhost/api/types, http://localhost/api/users, http://localhost/api/events, http://localhost:3000/api/neighborhoods etc. by using the prefix
let testCtrl = require('./serverCtrls/testCtrl');
app.use('/api', userSession, types);
app.use('/api', userSession, users);
app.use('/api', userSession, events);
app.use('/api', userSession, neighborhoods);
app.get('/whoami', function(req, res, done) {
  return res.send(session.user);
});

const port = process.env.PORT || config.PORT || 3000;
app.listen(port, () => {
  console.log(`sup from port ${port}`);
})
