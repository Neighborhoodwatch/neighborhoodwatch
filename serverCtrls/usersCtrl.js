module.exports = {
  // oauthCallback = function (strategy) {
  //   return function (req, res, next) {
  //     passport.authenticate(strategy, function (err, user, redirectURL) {
  //       if(err || !user) {
  //         return res.redirect('/#!/signin');
  //       }
  //
  //       req.login(user, function (err) {
  //         if(err) {
  //           return res.redirect('/#!/signin');
  //         }
  //
  //         return res.redirect(redirectURL || '/');
  //       })(req, res, next);
  //     })
  //   };
  // },

  // saveOAuthUserProfile = function (req, providerUserProfile, done) {
  //
  // },

  getUsers: (req, res, next) => {
      var db = req.app.get('db');
      db.get_users((err, resp) => {
          if(err) {
              res.status(420).json(err);
          } else {
              req.session.order = resp;
              res.send(resp);
          }
      })
  },
  createUser: (req, res, next) => {
      var db = req.app.get('db');
      var user = req.body;

      var first_name = user.first_name;
      var last_name = user.last_name;
      var username = user.username;
      var email = user.email;
      var facebook_id = user.facebook_id;
      var google_id = user.google_id;
      var password = user.password;
      var photo = user.photo;

      db.create_user([first_name, last_name, username, email, facebook_id, google_id, password, photo], (err, resp) => {
          if (err) {
          res.status(420).json(err)
      } else {

        req.session.user = resp
        res.send(resp)
      }
    })
  },
  getUser: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.get_user([id], (err, resp) => {
        if(err) {
            res.status(420).json(err);
        } else {
            req.session.user = resp;
            req.session.isLoggedIn = true
            res.send(resp);
        }
    })
  },
  getCurrentUser: (req, res, next) => {
    res.send(req.session)
  },
  updateUser: (req, res, next) => {
    var db = req.app.get('db');
    var user_id = req.params.id;
    var user = req.body;

    db.update_user([user.first_name, user.last_name, user.username, user.email, user.photo, user_id], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {
            req.session.user = resp
            res.send(resp)
        }
    })
  },
  deleteUser: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.delete_user([id], (err, resp) => {
        if(err) {
            res.status(420).json(err);
        } else {
            console.log('Deleted user with id:', id)
            req.session.user = {};
            res.send(resp);
        }
    })
  },
  getEvents: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.get_events_followed([id], (err, resp) => {
        if(err) {
            res.status(420).json(err);
        } else {
            req.session.order = resp;
            res.send(resp);
        }
    })
  },
  getFacebookUser: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.get_facebook_user([id], (err, resp) => {
        if(err) {
            res.status(420).json(err);
        } else {
            req.session.order = resp;
            res.send(resp);
        }
    })
  },
  getGoogleUser: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.get_google_user([id], (err, resp) => {
        if(err) {
            res.status(420).json(err);
        } else {
            req.session.order = resp;
            res.send(resp);
        }
    })
  },
  getInternalUser: (req, res, next) => {
    var db = req.app.get('db');
    var username = req.params.id;
    db.get_internal_user([username], (err, resp) => {
        if(err) {
            res.status(420).json(err);
        } else {
            req.session.order = resp;
            res.send(resp);
        }
    })
  },
  signin: (req, res, next) => {
    var db = req.app.get('db')
    var username = req.params.username
    var password = req.params.password
    db.get_user_login([password, username], (err, resp) => {
      if(err) {
        res.status(420).json(err)
      } else {
        req.session.user = resp
        req.session.isLoggedIn = true
        res.send(req.session)
      }
    })
  },
  checkLoggedIn: (req, res, next) => {
    res.send(req.session.isLoggedIn)
  }
}
