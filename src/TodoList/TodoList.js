/** @jsx React.DOM */

var React = require('react');
var TodoItem = require('./TodoItem.js');
var Link = require('react-router').Link;

var TodoList = React.createClass({
  getDefaultProps: function(){
    return {
      initialItems: [],
      initialValue: ''
    };
  },
  getInitialState: function(){
    return {
      items: this.props.initialItems,
      value: this.props.initialValue
    }
  },
  handleClick: function(event){
    var value = this.state.value;
    if(value !== ''){
      var items = this.state.items;
      items.push(value);
      this.setState({
        items: items,
        value: ''
      });
    }
  },
  handleChange: function(event){
    this.setState({
      value: event.target.value
    });
  },
  handleItemRemove: function(itemProps){
    var items = this.state.items;
    items.splice(itemProps.key, 1);
    this.setState({
      items: items
    });
  },
  render: function(){
    var todoItems = this.state.items.map(function(item, index){
      return (
        <TodoItem key={index} text={item} onClick={this.handleItemRemove}/>
      );
    }.bind(this));

    return (
      <div>
        <div>
          <input ref="input" type="text" value={this.state.value} onChange={this.handleChange}/>
          <button disabled={this.state.value === ''} onClick={this.handleClick}>Ajouter !</button>
        </div>
        <ul>
          {todoItems}
        </ul>
      </div>
    );
  }
});

module.exports = TodoList;
