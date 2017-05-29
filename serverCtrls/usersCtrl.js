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
      var last_name = user.last_Name;
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
        req.session.order = resp
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
            req.session.order = resp;
            res.send(resp);
        }
    })
  },
  updateUser: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    var user = req.body;

    db.update_neighborhood([user.first_name, user.last_name, user.username, user.email, user.facebook_id, user.google_id, user.password, user.photo, id], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {
            console.log('user updated:', resp)

            req.session.order = resp
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
            req.session.order = resp;
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
  }
}
