/** @jsx React.DOM */

var React = require('react');
var App = require('./App/App.js');
var Home = require('./Home/Home.js');
var TodoList = require('./TodoList/TodoList.js');
var Profile = require('./Profile/Profile.js');
var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect} = require('react-router');

var routes = (
    <Routes location="hash">
        <Route name="app" path="/" handler={App}>
        <DefaultRoute name="home" handler={Home}/>
        <Route name="todo" handler={TodoList}/>
        <Route name="profile" handler={Profile}/>
        </Route>
    </Routes>
);

document.addEventListener('DOMContentLoaded', function() {
    React.renderComponent(routes, document.body);
});
