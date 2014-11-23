var Reflux = require('reflux');

var TodoActions = require('actions/TodoActions.js');
var SessionActions = require('actions/SessionActions.js');

var UserStore =  require('stores/UserStore.js');
var SessionStore = require('stores/SessionStore.js');

var TodoStore = Reflux.createStore({
    // Initial setup
    init: function() {
        this.listenTo(TodoActions.create, this.onCreate);
        this.listenTo(TodoActions.destroy, this.onDestroy);
    },
    getCurrentUserTodos: function(){
        var todos = SessionStore.get('todos') || {};
        return todos;
    },
    setCurrentUserTodos: function(todos){
        SessionActions.set('todos', todos);
        //SessionActions.merge('todos', todos);
    },
    onCreate: function(text){
        var currentUserTodos = this.getCurrentUserTodos();
        console.log('onCreate', currentUserTodos);
        var id = Date.now();
        currentUserTodos[id] = {
            id: id,
            text: text,
            completed: false
        };
        this.setCurrentUserTodos(currentUserTodos);
        this.trigger(currentUserTodos);
    },
    onDestroy: function (id){
        var currentUserTodos = this.getCurrentUserTodos();
        delete currentUserTodos[id];
        this.setCurrentUserTodos(currentUserTodos);
        this.trigger(currentUserTodos);
    }
});

module.exports = TodoStore;
