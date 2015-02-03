/** @jsx React.DOM */

var React = require('react');
var {Input} = require('react-bootstrap');
var {RaisedButton, TextField, Paper} = require('material-ui');
var UserActions = require('actions/UserActions.js');

require('./LoginForm.css');

var wellStyles = {maxWidth: 400, margin: '0 auto'};

var LoginForm = React.createClass({
    handleSubmit: function(event){
        UserActions.login(this.refs.username.getValue(), this.refs.password.getValue());
        event.preventDefault();
    },
    render: function() {
        return (
            <Paper style={wellStyles}>
                <form onSubmit={this.handleSubmit}>
                    <TextField ref="username" floatingLabelText="Username" />
                    <TextField ref="password" floatingLabelText="Password" type="password"/>
                    <RaisedButton label="Login" primary={true} type="submit"/>
                </form>
            </Paper>
        );
    }

});

module.exports = LoginForm;
