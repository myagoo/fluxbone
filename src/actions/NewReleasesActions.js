var Reflux = require('reflux');

var LastFm = require('api/lastfm.js');

var NewReleasesActions = Reflux.createActions(['load', 'loadSuccess', 'loadFail']);

NewReleasesActions.load.preEmit = function(username){
    LastFm.user.getNewReleases(username, true).then(NewReleasesActions.loadSuccess, NewReleasesActions.loadFail);
};

module.exports = NewReleasesActions;
