var localConfig = require('localConfig');
var {
  extend
} = require('utils.js')

module.exports = extend({
  "lastFmApiUri": "//ws.audioscrobbler.com/2.0/"
}, localConfig);