var express = require('express');
var router = express.Router();

var usersCtrl = require('../serverCtrls/usersCtrl');

//Add direct routes here
router.get('/users', usersCtrl.getUsers);
router.get('/users/:id', usersCtrl.getUser);
router.post('/users', usersCtrl.createUser);
router.put('/users/:id', usersCtrl.updateUser);
router.put('/users/:id/neighborhood', usersCtrl.updateNeighborhood);
router.delete('/users/:id', usersCtrl.deleteUser);
//the above code has been tested and works (Postman);
router.get('/users/:id/events', usersCtrl.getEvents);

// not sure what the below code is doing if we can already get all
// of a users info with the calls above

//router.get('/users/:id/facebook', usersCtrl.getFacebookUser);
//router.get('/users/:id/google', usersCtrl.getGoogleUser);
//router.get('/users/:id/auth', usersCtrl.getInternalUser);
router.get('/current', usersCtrl.getCurrentUser);
router.get('/login/:username/:password', usersCtrl.signin)
router.get('/auth/checklogin', usersCtrl.checkLoggedIn)
router.get('/authenticate/google', usersCtrl.googleAuth)

module.exports = router;
