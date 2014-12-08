/** @jsx React.DOM */

var React = require('react');
var {Navbar, Nav, DropdownButton, MenuItem, Panel, Alert} = require('react-bootstrap');
var {RouteHandler, Link, Navigation, State} = require('react-router');

var NavItemLink = require('components/NavItemLink/NavItemLink.js');
var MenuItemLink = require('components/MenuItemLink/MenuItemLink.js');
var TodoList = require('components/TodoList/TodoList.js');
var LoginForm = require('components/LoginForm/LoginForm.js');

var UserStore = require('stores/UserStore.js');
var NotificationStore = require('stores/NotificationStore.js');

var NotificationActions = require('actions/NotificationActions.js');
var UserActions = require('actions/UserActions.js');

var {curry} = require('utils.js');

require('./App.css');

var App = React.createClass({
    onNotificationChange: function(){
        this.setState({
            notifications: NotificationStore.getNotifications()
        });
    },
    onUserChange: function(){
        this.setState({
            currentUser: UserStore.getCurrentUser()
        });
    },
    componentDidMount: function() {
        this.unsubscribeUser = UserStore.listen(this.onUserChange);
        this.unsubscribeNotification = NotificationStore.listen(this.onNotificationChange);
    },
    componentWillUnmount: function() {
        this.unsubscribeUser();
        this.unsubscribeNotification();
    },
    getInitialState: function(){
        return {
            currentUser: UserStore.getCurrentUser(),
            notifications: NotificationStore.getNotifications()
        }
    },
    handleLogoutClick: function(){
        UserActions.logout();
    },
    handleDismiss: function(notificationId){
        console.log('handleDismiss', arguments);
        NotificationActions.dismiss(notificationId);
    },
    render: function () {
        var notifications = Object.keys(this.state.notifications).map(function(notificationId){
            var notification = this.state.notifications[notificationId];
            return (
                <Alert bsStyle="danger" onDismiss={curry(this.handleDismiss, notificationId)}>
                <h4>{notification.type}</h4>
                <p>{notification.message}</p>
                </Alert>
            );
        }.bind(this));

        if(this.state.currentUser === null){
            return <LoginForm />
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
                    {notifications}
                </div>
            );
        }

    }
});

module.exports = App;
