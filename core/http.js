var Gun = require('gun')
var db = require('./db') //eslint-disable-line

module.exports = app => {
  app.set('json spaces', 3)
  app.use(Gun.serve)
}
