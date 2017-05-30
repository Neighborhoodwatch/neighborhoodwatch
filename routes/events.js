var express = require('express');
var router = express.Router();

var eventsCtrl = require('../serverCtrls/eventsCtrl');

//Add direct routes here
router.get('/events', eventsCtrl.getEvents);
router.get('/events/:id', eventsCtrl.getEvent);

router.get('/events/:id/followers', eventsCtrl.getFollowers);
router.post('/events', eventsCtrl.createEvent);
router.put('/events/:id', eventsCtrl.updateEvent);
router.delete('/events/:id', eventsCtrl.deleteEvent);
router.get('/created/:id', eventsCtrl.getCreatedEvents)
router.get('/followed/:id', eventsCtrl.getFollowedEvents)

module.exports = router;
