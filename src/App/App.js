/** @jsx React.DOM */

var React = require('react');
var {MenuBar, MenuItem, Menu, Separator} = require('react-menu-bar');
var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect, Link} = require('react-router');
var TodoList = require('../TodoList/TodoList.js');

require('./App.css');

var App = React.createClass({
  handleSelect: function (key) {
    console.log('Selected: %s', key);
  },
  render: function () {
    return (
      <div>
        <MenuBar onSelect={this.handleSelect}>
            <MenuItem key="home"><Link to="home">Home</Link></MenuItem>
            <MenuItem key="todo"><Link to="todo">Todo</Link></MenuItem>
        </MenuBar>
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});

module.exports = App;
