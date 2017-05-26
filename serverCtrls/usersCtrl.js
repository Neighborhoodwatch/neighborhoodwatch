module.exports = {
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
      var path = req.body;

      var first_name = path.first_name;
      var last_name = path.last_Name;
      var username = path.username;
      var email = path.email;
      var facebook_id = path.facebook_id;
      var google_id = path.google_id;
      var password = path.password;

      db.create_user([first_name, last_name, username, email, facebook_id, google_id, password], (err, resp) => {
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
    res.send({todo: 'do this code'})
  },
  updateUser: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  deleteUser: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  getNeighborhoods: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  getEvents: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  }
}
