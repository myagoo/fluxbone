/** @jsx React.DOM */

var React = require('react');
var {Input} = require('react-bootstrap');
var UserActions = require('actions/UserActions.js');

require('./LoginForm.css');

var wellStyles = {maxWidth: 400, margin: '0 auto'};

var LoginForm = React.createClass({
    handleSubmit: function(event){
        UserActions.login(this.refs.login.getValue(), this.refs.password.getValue());
        event.preventDefault();
    },
    render: function() {
        return (
            <div className="well loginForm" style={wellStyles}>
              <form onSubmit={this.handleSubmit}>
              <Input ref="login" label="Login" type="text" defaultValue="" />
              <Input ref="password" label="Password" type="password" defaultValue="" />
              <Input type="submit" bsStyle='primary' value="Login" />
            </form>
            </div>
        );
    }

});

module.exports = LoginForm;
