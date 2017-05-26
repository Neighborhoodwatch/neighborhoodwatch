let db = require('../index').get('db');

module.exports = {
    getOrder: (req, res, next) => {
      //get order from db by id
      db.get_order_id([req.params.id], (err, resp) => {
        if (err) {
          res.status(420).json(err)
        } else {
          req.session.order = resp
          res.json(resp)
        }
      })
    }
}
