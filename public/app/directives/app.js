var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require('massive');

var config = require('./config');

//authentication
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');

//Routes
var index = require('./routes/index');
var products = require('./routes/products');
var customers = require('./routes/customers');
var states = require('./routes/states');
var orders = require('./routes/orders');
var orderitems = require('./routes/orderitems');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      var err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
      cb(null, file.originalname);
    }
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }
}).single('myfile');

app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
      } else if (err.code === 'filetype') {
        res.json({ success: false, message: 'Filetype is invalid. Must be .png' });
      } else {
        res.json({ success: false, message: 'Unable to upload file' });
      }
    } else {
      if (!req.file) {
        res.json({ success: false, message: 'No file was selected' });
      } else {
        res.json({ success: true, message: 'File uploaded!' });
      }
    }
  });
});

var connectionString = "postgres://" + config.dbUser + ":" + config.dbPassword + "@localhost/" + config.database;
var instance = massive.connectSync({
  connectionString: connectionString
});

app.set('db', instance);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: config.sessionSecret
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
}, function(token, refreshToken, profile, done) {
  console.log('user logged in', profile, token);
  var id,  name;

  if(profile.emails) {
    id= profile.emails[0].value;
  } else {
    // id=profile.displayName;
    id=profile.id;
  }
  name = profile.displayName;

  db.get_user_facebook([id], function(err, user) {
    if(err) {
      // console.log('getFacebookUser', id, err);
      return done(err);
    }

    if(user && user.length > 0) {
      console.log('found user, updating...', user);
      //TODO: Update user?
      session.user = user;
      console.log('setting session user-->', session.user);
      return done(null, user);
    } else {
      console.log('inserting user...', id, name, token);
      //name, email, password, profiletoken, facebookid
      db.insert_user([name, id, '', token, 0],
      function(err, user) {
        if(err) {
          console.log('getNewFacebookUser', id, err);
          return done(err);
        }

        session.user = user;
        console.log('setting session user-->', session.user);

        return done(null, {
          name: name,
          email: id,
          password: '',
          profiletoken: token
        })
      })
    }
  })
}));

//call facebook app for authentication --just middleware here, no callback
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

//facebook returns to this url to do something after authentication
//pass string, middleware, callback function
app.get('/auth/facebook/callback',
passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/auth/facebook'
}),
function(req, res, next) {
  return next(res);
}
);

app.get('/whoami', function(req, res, done) {
  console.log('authenticate', session.user);
  return res.send(session.user);
})

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var db = app.get('db');

app.use('/', index);
// app.use('/users', users);
app.use('/api', products);
app.use('/api', customers);
app.use('/api', states);
app.use('/api', orders);
app.use('/api', orderitems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
