module.exports = {
  getNeighborhoods: (req, res, next) => {
    var db = req.app.get('db');
      db.get_neighborhoods((err, resp) => {
          if(err) {
            res.send(420).json(err);
          } else {
              req.session.order = resp;
              res.send(resp);
          }
      })
  },
  getNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  createNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  updateNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  deleteNeighborhood: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  getUsers: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  getEvents: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  }
}
