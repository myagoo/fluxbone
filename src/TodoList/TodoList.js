/** @jsx React.DOM */

var React = require('react');
var TodoItem = require('./TodoItem.js');
var Link = require('react-router').Link;
var TodoStore = require('../stores/TodoStore.js');
var TodoActions = require('../actions/TodoActions.js');

var TodoList = React.createClass({
    onTodoChange: function(){
        this.setState({
            todos: TodoStore.getTodos(),
        });
    },
    componentDidMount: function() {
        TodoStore.addChangeListener(this.onTodoChange);
    },
    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this.onTodoChange);
    },
    getInitialState: function(){
        return {
            todos: TodoStore.getTodos(),
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
