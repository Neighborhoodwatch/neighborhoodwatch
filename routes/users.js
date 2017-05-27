var express = require('express');
var router = express.Router();

var usersCtrl = require('../serverCtrls/usersCtrl');

//Add direct routes here
router.get('/users', usersCtrl.getUsers);
// router.get('/users/:id', usersCtrl.getUser);
router.post('/users', usersCtrl.createUser);
//router.put('/users/:id', usersCtrl.updateUser);
//router.delete('/users/:id', usersCtrl.deleteUser);
//router.get('/users/:id/neighborhood', usersCtrl.getNeighborhoods)
//router.get('/users/:id/events', usersCtrl.getEvents);

module.exports = router;
