var express = require('express');
var router = express.Router();

var usersCtrl = require('../serverCtrls/usersCtrl');

//Add direct routes here
router.get('/users', usersCtrl.getUsers);
router.get('/users/:id', usersCtrl.getUser);
router.post('/users', usersCtrl.createUser);
router.put('/users/:id', usersCtrl.updateUser);
router.delete('/users/:id', usersCtrl.deleteUser);
router.get('/users/:id/events', usersCtrl.getEvents);
router.get('/users/:id/facebook', usersCtrl.getFacebookUser);
router.get('/users/:id/google', usersCtrl.getGoogleUser);
router.get('/users/:id/auth', usersCtrl.getInternalUser);

module.exports = router;
