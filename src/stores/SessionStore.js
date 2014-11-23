var Reflux = require('reflux');
var merge = require('react/lib/merge');

var SessionActions = require('actions/SessionActions.js');

var UserStore =  require('stores/UserStore.js');

var SessionStore = Reflux.createStore({
    // Initial setup
    init: function() {
        this.storage = sessionStorage;

        this.listenTo(SessionActions.set, this.onSet);
        this.listenTo(SessionActions.remove, this.onRemove);
    },
    getUserSession: function(){
        return JSON.parse(this.storage.getItem(UserStore.getCurrentUser().login)) || {};
    },
    setUserSession: function(session){
        this.storage.setItem(UserStore.getCurrentUser().login, JSON.stringify(session));
    },
    get: function(key){
        var userSession = this.getUserSession();
        return userSession[key];
    },
    set: function(key, value){
        var userSession = this.getUserSession();
        userSession[key] = value;
        this.setUserSession(userSession);
        return value;
    },
    remove: function(key){
        var userSession = this.getUserSession();
        delete userSession[key];
        this.setUserSession(userSession);
        return key;
    },
    onSet: function(key, value){
        this.trigger(this.set(key, value));
    },
    onRemove: function(key){
        this.trigger(this.remove(key));
    }
});


module.exports = SessionStore;
