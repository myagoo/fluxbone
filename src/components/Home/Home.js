var React = require('react');

var NotificationActions = require('actions/NotificationActions.js');

var LastFm = require('api/lastfm.js');

var {debounce} = require('utils.js');

var Home = React.createClass({
    getInitialState: function(){
        return {
            username: '',
            userInfo: {}
        };
    },
    loadUserInfo: debounce(function(userName){
        LastFm.user.getInfo(userName).then(function(userInfo){
            this.setState({
                userInfo: userInfo
            });
        }.bind(this)).catch(function(error){
            console.log('catched', error);
            NotificationActions.create({
                type: 'error',
                message: error.message
            });
        });
    }, 1000),
    handleChange: function(e){

        var username =  this.refs.username.getDOMNode().value;

        this.loadUserInfo(username);

        this.setState({
            username: username
        });
    },
    render: function(){
        return (
            <div>
                <input ref="username" type="text" onChange={this.handleChange} value={this.state.username}/>
                <pre>{JSON.stringify(this.state.userInfo || {})}</pre>
            </div>

        );
    }
});

module.exports = Home;
