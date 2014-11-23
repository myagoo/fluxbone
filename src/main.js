/** @jsx React.DOM */

var React = require('expose?React!react');

var App = require('components/App/App.js');
var Home = require('components/Home/Home.js');
var TodoList = require('components/TodoList/TodoList.js');
var Profile = require('components/Profile/Profile.js');

var {Route, DefaultRoute, run} = require('react-router');

var routes = (
        <Route name="app" path="/" handler={App}>
            <DefaultRoute name="home" handler={Home}/>
            <Route name="todo" handler={TodoList}/>
            <Route name="profile" handler={Profile}/>
        </Route>
);

document.addEventListener('DOMContentLoaded', function() {
    run(routes, function (Handler) {
        React.render(<Handler/>, document.body);
    });
});
