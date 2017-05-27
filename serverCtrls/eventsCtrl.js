module.exports = {
  getEvent: (req, res, next) => {
    var db = req.app.get('db');
     var event_id = req.body.event_id;

     db.get_event([event_id], (err, resp) => {
         if (err) {
             res.status(420).json(err);
         } else {
             req.session.order = resp;
             res.send(resp);
         }
     })
   },
   getEvents: (req, res, next) => {
     var db = req.app.get('db');
       db.get_events((err, resp) => {
           if(err) {
           res.send(420).json(err);
           } else {
               req.session.order = resp;
               res.send(resp);
           }
       })
   },
   createEvent: (req, res, next) => {
       var db = req.app.get('db');
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
                console.log('new event created:', path)

                req.session.order = resp
                res.send(resp)
            }
        })
    },
    updateEvent: (req, res, next) => {
      var db = req.app.get('db');
      res.send({todo: 'do this code'})
    },
    deleteEvent: (req, res, next) => {
      var db = req.app.get('db');
      res.send({todo: 'do this code'})
    }
}
