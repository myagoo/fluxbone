/** @jsx React.DOM */

var React = require('react');
var {Input} = require('react-bootstrap');

var UserActions = require('actions/UserActions.js');

var UserStore = require('stores/UserStore.js');

var wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

var Profile = React.createClass({
    onUserChange: function(){
        this.setState({
            user: UserStore.getCurrentUser(),
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
            user: UserStore.getCurrentUser()
        }
    },
    handleSubmit: function(event){
        UserActions.edit(this.refs.login.getValue());
        event.preventDefault();
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
              <Input ref="login" label="Login" type="text" defaultValue={this.state.user.login} />
              <Input type="submit" bsStyle='primary' value="Edit" />
            </form>
        );
    }

});

module.exports = Profile;
