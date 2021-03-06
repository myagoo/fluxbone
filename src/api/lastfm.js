var rest = require('rest');
var mime = require('rest/interceptor/mime');
var {
  lastFmApiKey, lastFmApiUri
} = require('config.js');

var client = rest.wrap(mime);

function lastFmApiCall(method, params) {
  params = params || {};

  params.format = 'json';
  params.api_key = lastFmApiKey;
  params.method = method;

  return client({
    path: lastFmApiUri,
    params: params
  }).then(function(response) {
    if (response.entity.error) {
      throw new Error(response.entity.message);
    }
    return response.entity;
  });
};

module.exports = {
  user: {
    getInfo: function(userName) {
      return lastFmApiCall('user.getinfo', {
        user: userName
      });
    },
    getNewReleases: function(userName, userecs) {
      return lastFmApiCall('user.getnewreleases', {
        user: userName,
        userecs: userecs
      });
    },
    getTopArtists: function(userName, period, limit, page) {
      return lastFmApiCall('user.gettopartists', {
        user: userName,
        period: period,
        limit: limit,
        page: page
      });
    }
  }
}
