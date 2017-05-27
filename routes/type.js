var express = require('express');
var router = express.Router();

var typesCtrl = require('../serverCtrls/typesCtrl');

router.get('/types', typesCtrl.getTypes);
router.get('/types/:id', typesCtrl.getType);
// router.post('/types', typesCtrl.createType);
// router.put('/types/:id', typesCtrl.updateType);
// router.delete('/types/:id', typesCtrl.deleteType);

module.exports = router;
