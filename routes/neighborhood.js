var express = require('express');
var router = express.Router();

//Add direct routes here
var neighborhoodCtrl = require('../serverCtrls/neighborhoodCtrl');

router.get('/neighborhoods', neighborhoodCtrl.getNeighborhoods);
router.get('/neighborhoods/:id', neighborhoodCtrl.getNeighborhood);
router.post('/neighborhoods', neighborhoodCtrl.createNeighborhood);
router.put('/neighborhoods/:id', neighborhoodCtrl.updateNeighborhood);
router.delete('/neighborhoods/:id', neighborhoodCtrl.deleteNeighborhood);
// ^^^ tested and works in postman//
router.get('/neighborhoods/:id/users', neighborhoodCtrl.getUsers);
router.get('/neighborhoods/:id/events', neighborhoodCtrl.getEvents);
router.get('/users/neighborhood/:id', neighborhoodCtrl.getUsersNeighborhood)

module.exports = router;
