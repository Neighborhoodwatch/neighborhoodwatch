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
  updateNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    var neighborhood_id = req.body.neighborhood_id;

    db.update_user_neighborhood([neighborhood_id, id], (err, resp) => {
        if(err) {
            res.status(420).json(err);
        } else {
            res.send(resp);
        }
    })
  },
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

    db.update_user([user.first_name, user.last_name, user.username, user.email, user.facebook_id, user.password, user.photo, user_id], (err, resp) => {
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
      } else if (resp.length === 0) {
        res.send("User did not exist")
      }
      else {
        req.session.user = resp
        req.session.isLoggedIn = true
        res.send(req.session)
      }
    })
  },
  checkLoggedIn: (req, res, next) => {
    res.send(req.session.isLoggedIn)
  },
  //Google auth functions
  googleAuth: (req, res, next) => {
    var db = req.app.get('db')
    let google_id = req.user.id
    let primary_email = req.user.emails[0].value
    db.get_google_user(google_id, (err, resp) => {
      if(err) {
        res.status(420).json(err)
      } else {
        //more checks need to be put in place to make sure that it checks against all available emails
        if(resp.length === 0) {

          db.get_google_email(primary_email, (err, response) => {
            if(err) {
              res.status(420).json(err)
            } else if(response.length > 0) {
              let user = response[0]
              db.update_google_id([google_id, user.user_id], (err, response) => {
                if(err) {
                  res.status(420).json(err)
                } else if(response.length > 0){
                  req.session.user = response
                  req.session.isLoggedIn = true
                  res.redirect('/#!/user')
                }
              })
            } else {
              req.session.googleUser = false
              res.redirect('/#!/login')
            }
          })
        } else if (resp.length > 0) {
          req.session.user = resp
          req.session.isLoggedIn = true
          res.redirect('/#!/user')
        }
      }
    })
  },
  //Facebook auth functions
  facebookAuth: (req, res, next) => {
    var db = req.app.get('db')
    var profile = req.user
    db.get_facebook_user(profile.id, function(err, user) {
        if (user.length === 0) {
            db.create_facebook_user([profile.displayName, profile.id],

            function(err, user) {
              req.session.user = user
              req.session.isLoggedIn = true
              req.session.facebookUser = true
              res.redirect('/#!/user')
            })
        } else if(user.length > 0){
          req.session.user = user
          req.session.isLoggedIn = true
          res.redirect('/#!/user')
        }
    })
  }
}
