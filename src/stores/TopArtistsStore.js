var Reflux = require('reflux');

var TopArtistsActions = require('actions/TopArtistsActions.js');

var TopArtistsStore = Reflux.createStore({
    init: function() {
        this.listenTo(TopArtistsActions.loadSuccess, this.onloadSuccess);
    },
    getInitialState: function(){
        return {
            topArtists: undefined
        }
    },
    onloadSuccess: function(topArtists) {
        console.log('onloadSuccess', topArtists);
        this.topArtists = topArtists;
        this.trigger(this.topArtists);
    },
    getTopArtists: function() {
        return this.topArtists;
    }
});

module.exports = TopArtistsStore;
