/** @jsx React.DOM */

var React = require('react');
var {Input} = require('react-bootstrap');
var UserActions = require('actions/UserActions.js');

var wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

var LoginForm = React.createClass({
    handleSubmit: function(event){
        UserActions.login(this.refs.login.getValue(), this.refs.password.getValue());
        event.preventDefault();
    },
    render: function() {
        return (
            <div className="well" style={wellStyles}>
              <form onSubmit={this.handleSubmit}>
              <Input ref="login" label="Login" type="text" defaultValue="" />
              <Input ref="password" label="Password" type="password" defaultValue="" />
              <Input type="submit" bsStyle='primary' value="Se connecter" />
            </form>
            </div>
        );
    }

});

module.exports = LoginForm;
