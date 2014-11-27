/** @jsx React.DOM */

var React = require('expose?React!react');

var RouteActions = require('actions/RouteActions.js');

var {run} = require('react-router');
var router = require('router.js');

document.addEventListener('DOMContentLoaded', function() {
    router.run(function (Handler, state) {
        console.log('toto');
        RouteActions.transition(Handler, state);
        React.render(<Handler/>, document.body);
    });
});
