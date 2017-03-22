var Gun = require('gun')
var app = require('./app')

var gun = Gun({
  file: './data.json',
  web: app
})

module.exports = gun
