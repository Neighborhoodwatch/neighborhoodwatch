const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
// const config = require('./config');


const massive = require('massive');
let connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost/neighborhood";
let massiveInstance = massive.connectSync({connectionString})

var app = module.exports = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: true
 }));

app.use(cors());

app.set('db', massiveInstance);
var db = app.get('db');

let testCtrl = require('./serverCtrls/testCtrl');
// let cartCtrl = require('./controllers/cartCtrl');
// let stripeCtrl = require('./controllers/stripeCtrl');
// let orderCtrl = require('./controllers/orderCtrl');

// app.post('/api/cart/', testCtrl.something );

const port = 3000
app.listen(process.env.PORT || port, () => {
  console.log(`sup from port ${port}`);
})
