var express = require('express')
var debug = require('debug')('express-gun:routes')
var Gun = require('gun')
var router = express.Router()

var bodyParser = require('body-parser');

var db = require('./db')
var data = db.get('data')

/* Router Settings */

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.all('*',function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    next();
});

router.get('/', (req, res) => {
  	res.sendStatus(200)
})

/* SET DATA */

router.post('/api/set/:id', (req, res) => {
  try {
	console.log(req.body)
	data.path(req.params.id).put(req.body)
	res.sendStatus(200)
  } catch(e) {
	console.log(e)
	res.sendStatus(500)
  }
})

router.get('/api/set/:id/:key/:value', (req, res) => {
  try {
	var doc = {}; doc[req.params.key] = req.params.value;
	data.path(req.params.id).put(doc)
	res.sendStatus(200)
  } catch(e) {
	console.log(e)
	res.sendStatus(500)
  }
})

/* GET DATA */

router.get('/api/link/:id/:link', (req, res) => {
  try {
	var link = data.path(req.params.link);
	data.path(req.params.id).path('link').put(link)
	res.sendStatus(200)
  } catch(e) {
	console.log(e)
	res.sendStatus(500);
  }
})

/* GET DATA */

router.get('/api/get/:id/:key?', (req, res) => {
  try {
	data.path(req.params.id).val(function(data){
		if (!data) res.sendStatus(404)
	  	else if (req.params.key) res.send(data[req.params.key])
	  	else res.send(data)
	}).not(function(){ res.sendStatus(404) });
  } catch(e) {
	console.log(e)
	res.sendStatus(500);
  }
})

router.get('/api/getlink/:id', (req, res) => {
  try {
	data.path(req.params.id).path('link').map().val(function(data, key){
		console.log("Link:", key, data);
		if (!data) res.sendStatus(404)
	  	else res.send(data)
	}).not(function(){ res.sendStatus(404) });
  } catch(e) {
	console.log(e)
	res.sendStatus(500);
  }
})

/* UNSET DATA */

router.get('/api/unset/:id/:key?', (req, res) => {
  try {
	data.path(req.params.id).put(null)
	res.sendStatus(200)
  } catch(e) {
	console.log(e)
	res.sendStatus(500)
  }
})


module.exports = app => {
  app.use(Gun.serve)
  app.use('/', router)
}
