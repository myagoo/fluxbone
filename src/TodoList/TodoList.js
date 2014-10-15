/** @jsx React.DOM */

var React = require('react');
var TodoItem = require('./TodoItem.js');
var Link = require('react-router').Link;
var TodoStore = require('../stores/TodoStore.js');
var TodoActions = require('../actions/TodoActions.js');

var TodoList = React.createClass({
    onTodoChange: function(currentUserTodos){
        this.setState({
            todos: currentUserTodos
        });
    },
    componentDidMount: function() {
        this.unsubscribe = TodoStore.listen(this.onTodoChange);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    getInitialState: function(){
        return {
            todos: TodoStore.getCurrentUserTodos(),
            value: ''
        }
    },
    handleClick: function(event){
        TodoActions.create(this.state.value);
    },
    handleChange: function(event){
        this.setState({
            value: event.target.value
        });
    },
    render: function(){
        var todoItems = Object.keys(this.state.todos).map(function(id){
            return (
                <TodoItem key={id} todo={this.state.todos[id]}/>
            );
        }.bind(this));

        return (
            <div>
                <div>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <button disabled={this.state.value === ''} onClick={this.handleClick}>Ajouter</button>
                </div>
                <ul>
                    {todoItems}
                </ul>
            </div>
        );
    }
});

module.exports = TodoList;
