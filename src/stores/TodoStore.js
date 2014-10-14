var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants.js');
var merge = require('react/lib/merge');

var todos = {};

var CHANGE_EVENT = 'change';

function destroy(id){
    delete todos[id];
}

function create(text){
    var id = Date.now();
    todos[id] = {
        id: id,
        text: text,
        completed: false
    };
}

var TodoStore = merge(EventEmitter.prototype, {
    getTodos: function() {
        return todos;
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
    var text;
    switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
            }
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_DESTROY:
            destroy(action.id);
            TodoStore.emitChange();
            break;
        default:
            return;
    }
});

module.exports = TodoStore;
