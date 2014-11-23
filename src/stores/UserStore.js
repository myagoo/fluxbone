var Reflux = require('reflux');
var UserActions = require('actions/UserActions.js');

var UserStore = Reflux.createStore({
    currentUser: null,
    // Initial setup
    init: function() {
        // Register statusUpdate action
        this.listenTo(UserActions.login, this.login);
        this.listenTo(UserActions.logout, this.logout);
        this.listenTo(UserActions.edit, this.edit);
    },
    login: function(login, password){
        this.currentUser = {
            login: login,
            password: password
        };
        this.trigger(this.currentUser);
    },
    logout: function (){
        this.currentUser = null;
        this.trigger(this.currentUser);
    },
    edit: function(login){
        this.currentUser.login = login;
        this.trigger(this.currentUser);
    },
    getCurrentUser: function(){
        return this.currentUser;
    }
});

module.exports = UserStore;
