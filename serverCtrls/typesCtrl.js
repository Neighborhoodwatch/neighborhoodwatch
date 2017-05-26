module.exports = {
  getTypes : function(req, res, next) {
    var db = req.app.get('db');
    db.get_types(function(err, types) {
      if (err) {
        res.send(err);
        return;
      }
      console.log('types', types);
      res.send(types);
    })
  },
  updateType: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  createType: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  },
  deleteType: (req, res, next) => {
    var db = req.app.get('db');
    res.send({todo: 'do this code'})
  }
}
