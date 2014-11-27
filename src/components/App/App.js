/** @jsx React.DOM */

var React = require('react');
var {Toolbar, ToolbarGroup, DropDownMenu, PaperButton, Icon} = require('material-ui');
var {RouteHandler, Link, Navigation, State} = require('react-router');

var NavItemLink = require('components/NavItemLink/NavItemLink.js');
var MenuItemLink = require('components/MenuItemLink/MenuItemLink.js');
var TodoList = require('components/TodoList/TodoList.js');
var LoginForm = require('components/LoginForm/LoginForm.js');

var UserStore = require('stores/UserStore.js');

var UserActions = require('actions/UserActions.js');

require('./App.css');

var App = React.createClass({
    mixins: [Navigation, State],
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
    handleMenuChange: function(event, index, item){
        this.transitionTo(item.to);
    },
    render: function () {
        if(this.state.currentUser === null){
            return <LoginForm/>
        }else{
            var items =  [
                { to: 'home', text: 'Home'},
                { to: 'todo', text: 'Todo'},
                { to: 'profile', text: 'Profile'},
            ];

            var selectedIndex = 0;

            items.forEach(function(item, index){
                if(this.isActive(item.to)){
                    selectedIndex = index;
                    return false;
                }
            }.bind(this));

            return (
                <div>
                <Toolbar>
                    <ToolbarGroup float="left">
                        <DropDownMenu menuItems={items} onChange={this.handleMenuChange} selectedIndex={selectedIndex}/>
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <Icon icon="action-home"/>
                        <Icon icon="action-home"/>
                        <span className="mui-toolbar-separator">&nbsp;</span>
                        <PaperButton type="RAISED" primary={true} label="Logout"/>
                    </ToolbarGroup>
                </Toolbar>
                <RouteHandler />
                </div>
            );
        }

    }
});

module.exports = App;
