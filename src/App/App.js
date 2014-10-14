/** @jsx React.DOM */

var React = require('react');
var {Navbar, Nav, DropdownButton, MenuItem, Panel} = require('react-bootstrap');
var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect, Link} = require('react-router');
var NavItemLink = require('./NavItemLink.js');
var MenuItemLink = require('./MenuItemLink.js');
var TodoList = require('../TodoList/TodoList.js');

require('./App.css');

var App = React.createClass({
  render: function () {
    return (
      <div>
      <Navbar>
        <Nav>
          <NavItemLink to="home">Home</NavItemLink>
          <NavItemLink to="todo">Todo</NavItemLink>
          <DropdownButton key={3} title="Dropdown">
            <MenuItemLink to="home">Home</MenuItemLink>
            <MenuItemLink to="todo">Todo</MenuItemLink>
            <MenuItem divider />
            <MenuItemLink to="home">Home</MenuItemLink>
            <MenuItemLink to="todo">Todo</MenuItemLink>
          </DropdownButton>
        </Nav>
      </Navbar>
      <this.props.activeRouteHandler/>
      </div>
    );
  }
});

module.exports = App;
