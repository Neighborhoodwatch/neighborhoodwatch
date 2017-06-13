let db = require('../index').get('db');

module.exports = {
    getUsers: (req, res, next) => {
        db.get_users((err, resp) => {
            if(err) {
                res.status(420).json(err);
            } else {
                req.session.order = resp;
                res.json(resp);
            }
        })
    },
    getEvent: (req, res, next) => {
        var event_id = req.body.event_id;

        db.get_event([event_id], (err, resp) => {
            if (err) {
                res.status(420).json(err);
            } else {
                req.session.order = resp;
                res.json(resp);
            }
        })
    },
    getEvents: (req, res, next) => {
        db.get_events((err, resp) => {
            if(err) {
            res.send(420).json(err);
            } else {
                req.session.order = resp;
                res.json(resp);
            }
        })
    },
    createUser: (req, res, next) => {
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
          res.json(resp)
        }
      })
    },
    createEvent: (req, res, next) => {
        var path = req.body;

        var lat = path.lat;
        var lon = path.lon;
        var details = path.details;
        var title = path.title;
        var type_id = path.type_id;
        var created_by = path.created_by;
        var event_location_lat = path.event_location_lat;
        var event_location_lon = path.event_location_lon;
        var event_time = path.event_time;


        db.create_event([lat, lon, details, title, type_id, created_by, event_location_lat, event_location_lon, event_time], (err, resp) => {
            if (err) {
                res.status(420).json(err);
            } else {              
                req.session.order = resp
                res.json(resp)
            }
        })
    }
}
