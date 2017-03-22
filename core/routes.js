var express = require('express')
var debug = require('debug')('express-gun:routes')
var router = express.Router()

var db = require('./db')
var data = db.get('data')

router.get('/', (req, res) => {
  data.path('message').set({
    test: 'Working'
  })
  debug('Record set')
  res.send('Record set')
})

module.exports = app => {
  app.use('/', router)
}
