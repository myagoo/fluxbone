var Reflux = require('reflux');

var LastFm = require('api/lastfm.js');

var TopArtistsActions = Reflux.createActions(['load', 'loadSuccess', 'loadFail']);

TopArtistsActions.load.preEmit = function(username){
    LastFm.user.getTopArtists(username).then(TopArtistsActions.loadSuccess, TopArtistsActions.loadFail);
};

module.exports = TopArtistsActions;
