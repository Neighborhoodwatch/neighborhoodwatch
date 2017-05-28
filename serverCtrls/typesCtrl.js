module.exports = {
  getTypes : function(req, res, next) {
    var db = req.app.get('db');
    db.get_types(function(err, resp) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(resp);
    })
  },
  getType: function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.get_type([id], function(err, resp) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(resp);
    })
  },
  updateType: (req, res, next) => {
    var db = req.app.get('db');
    var data = req.body;

    var id = req.params.id;
    db.update_type([data.name, id], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {
            console.log('type updated:', resp)

            req.session.order = resp
            res.send(resp)
        }
    })
  },
  createType: (req, res, next) => {
    var db = req.app.get('db');
    var data = req.body;

    db.create_type([data.name], (err, resp) => {
        if (err) {
            res.status(420).json(err);
        } else {
            console.log('type created:', resp)

            req.session.order = resp
            res.send(resp)
        }
    })
  },
  deleteType: (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.delete_type([id], function(err, resp) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(resp);
    })
  }
}
