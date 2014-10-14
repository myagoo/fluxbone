/** @jsx React.DOM */

var React = require('react');
var {Navbar, Nav, DropdownButton, MenuItem, Panel} = require('react-bootstrap');
var {Routes, Route, DefaultRoute, NotFoundRoute, Redirect, Link} = require('react-router');
var NavItemLink = require('./NavItemLink.js');
var MenuItemLink = require('./MenuItemLink.js');
var TodoList = require('../TodoList/TodoList.js');
var LoginForm = require('../LoginForm/LoginForm.js');
var UserStore = require('../stores/UserStore.js');
var UserActions = require('../actions/UserActions.js');

require('./App.css');

var App = React.createClass({
    onUserChange: function(){
        this.setState({
            currentUser: UserStore.getCurrentUser(),
        });
    },
    componentDidMount: function() {
        UserStore.addChangeListener(this.onUserChange);
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this.onUserChange);
    },
    getInitialState: function(){
        return {
            currentUser: UserStore.getCurrentUser()
        }
    },
    handleLogoutClick: function(){
        UserActions.logout();
    },
    render: function () {
        if(this.state.currentUser === null){
            return <LoginForm/>
        }else{
            return (
                <div>
                <Navbar>
                <Nav>
                <NavItemLink to="home">Home</NavItemLink>
                <NavItemLink to="todo">Todo</NavItemLink>
                <DropdownButton title={'Welcome ' + this.state.currentUser.login}>
                <MenuItemLink to="profile">Profile</MenuItemLink>
                <MenuItem divider />
                <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
                </DropdownButton>
                </Nav>
                </Navbar>
                <this.props.activeRouteHandler/>
                </div>
            );
        }

    }
});

module.exports = App;
