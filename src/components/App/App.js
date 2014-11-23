/** @jsx React.DOM */

var React = require('react');
var {Navbar, Nav, DropdownButton, MenuItem, Panel} = require('react-bootstrap');
var {RouteHandler} = require('react-router');

var NavItemLink = require('components/NavItemLink/NavItemLink.js');
var MenuItemLink = require('components/MenuItemLink/MenuItemLink.js');
var TodoList = require('components/TodoList/TodoList.js');
var LoginForm = require('components/LoginForm/LoginForm.js');

var UserStore = require('stores/UserStore.js');

var UserActions = require('actions/UserActions.js');

require('./App.css');

var App = React.createClass({
    onUserChange: function(){
        this.setState({
            currentUser: UserStore.getCurrentUser(),
        });
    },
    componentDidMount: function() {
        this.unsubscribe = UserStore.listen(this.onUserChange);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
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
                <Navbar fluid>
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
                <RouteHandler />
                </div>
            );
        }

    }
});

module.exports = App;
