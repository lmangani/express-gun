var Gun = require('gun')
var server = require('./app').server

var gun = Gun({
  file: './data.json',
  web: server
})

module.exports = gun
