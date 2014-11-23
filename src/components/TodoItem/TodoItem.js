/** @jsx React.DOM */

var React = require('react');

var TodoActions = require('actions/TodoActions.js');

var TodoItem = React.createClass({
    handleClick: function(event){
        TodoActions.destroy(this.props.todo.id);
    },
    render: function(){
        return (
            <li>
            <span>{this.props.todo.text}</span>
            <span onClick={this.handleClick}>&times;</span>
            </li>
        );
    }
});

module.exports = TodoItem;
