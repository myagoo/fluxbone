var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TodoConstants = require('../constants/UserConstants.js');

var UserActions = {
    login: function(login, password) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.USER_LOGIN,
            login: login,
            password: password
        });
    },
    logout: function() {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.USER_LOGOUT,
        });
    },
    edit: function(newLogin){
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.USER_EDIT,
            login: newLogin
        });
    }
};

module.exports = UserActions;
