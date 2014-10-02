/** @jsx React.DOM */

var React = require('react');
var TodoItem = require('./TodoItem.js');

var TodoList = React.createClass({
  getDefaultProps: function(){
    return {
      items: []
    };
  },
  render: function(){

    var todoItems = this.props.items.map(function(item){
      return (
        <TodoItem text={item.text}/>
      );
    }.bind(this));

    return (
      <div>
        <div>
          <input type="text"/><button>Ajouter</button>
        </div>
        <ul>
          {todoItems}
        </ul>
      </div>
    );
  }
});

module.exports = TodoList;
