module.exports = {
  getNeighborhoods: (req, res, next) => {
    var db = req.app.get('db');
    var state = req.query.state;
    db.get_neighborhoods([state], (err, resp) => {
        if(err) {
          res.send(420).json(err);
        } else {
            res.send(resp);
        }
    })
  },
  getNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
     var id = req.params.id;

     db.get_neighborhood([id], (err, resp) => {
         if (err) {
             res.status(420).json(err);
         } else {
             req.session.order = resp;
             res.send(resp);
         }
     })
  },
  createNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    var neighborhood = req.body;

    db.create_neighborhood([neighborhood.name, neighborhood.city, neighborhood.state], (err, resp) => {
      if(resp.length === 0) {
        res.send("Could not create neighborhood")
      }
        else if (err) {
            res.status(420).json(err);
        }  else {
            res.send(resp)
        }
    })
  },
  updateNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    var neighborhood = req.body;

    db.update_neighborhood([neighborhood.name, neighborhood.city, neighborhood.state, id], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {
            console.log('neighborhood updated:', resp)

            req.session.order = resp
            res.send(resp)
        }
    })
  },
  deleteNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;

    db.delete_neighborhood([id], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {
            console.log('neighborhood deleted:', resp)

            req.session.order = resp
            res.send(resp)
        }
    })
  },
  getUsers: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;

    db.get_neighborhood_users([id], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {
            console.log('neighborhood users:', resp)

            req.session.order = resp
            res.send(resp)
        }
    })
  },
  getEvents: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;

    db.get_neighborhood_events([id], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {

            res.send(resp)
        }
    })
  },
  getUsersNeighborhood: (req, res, next) => {
    var db = req.app.get('db')
    var user_id = req.params.id
    db.get_users_neighborhood([user_id], (err, resp) => {
      if(err) {
        res.status(420).json(err)
      } else {
        req.session.neighborhood = resp
        res.send(resp)
      }
    })
  },
  joinNeighborhood: (req, res, next) => {
    var db = req.app.get('db')
    var neighborhood_id = req.body.neighborhood_id
    var user_id = req.body.user_id
    db.set_users_neighborhood([neighborhood_id, user_id], (err, resp) => {
      if(err) {
        res.status(420).json(err)
      } else {
        req.session.neighborhood = resp
        res.send(req.session)
      }
    })
  }
}
