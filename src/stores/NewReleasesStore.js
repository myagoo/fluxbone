var Reflux = require('reflux');

var NewReleasesActions = require('actions/NewReleasesActions.js');

var NewReleasesStore = Reflux.createStore({
    init: function() {
        this.listenTo(NewReleasesActions.loadSuccess, this.onloadSuccess);
    },
    getInitialState: function(){
        return {
            newReleases: undefined
        }
    },
    onloadSuccess: function(newReleases) {
        console.log('onloadSuccess', newReleases);
        this.newReleases = newReleases;
        this.trigger(this.newReleases);
    },
    getNewReleases: function() {
        return this.newReleases;
    }
});

module.exports = NewReleasesStore;
