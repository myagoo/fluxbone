var Reflux = require('reflux');

var RouteActions = require('actions/RouteActions.js');

var RouteStore = Reflux.createStore({
  // Initial setup
  init: function() {
    this.listenTo(RouteActions.transition, this.onTransition);
  }
  onTransition: function() {
    console.log(arguments);
  }
});

module.exports = RouteStore;