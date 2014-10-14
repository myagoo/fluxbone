var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants.js');
var merge = require('react/lib/merge');

var currentUser = null;

var CHANGE_EVENT = 'change';

function login(login, password){
    currentUser = {
        login: login,
        password: password
    }
}

function logout(){
    currentUser = null;
}

function edit(login){
    currentUser.login = login;
}

var UserStore = merge(EventEmitter.prototype, {
    getCurrentUser: function() {
        return currentUser;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
        case UserConstants.USER_LOGIN:
            login(action.login, action.password);
            UserStore.emitChange();
            break;
        case UserConstants.USER_LOGOUT:
            logout();
            UserStore.emitChange();
            break;
        case UserConstants.USER_EDIT:
            edit(action.login);
            UserStore.emitChange();
            break;
        default:
            return;
    }
});

module.exports = UserStore;
