/** @jsx React.DOM */

var React = require('react');

var TodoItem = React.createClass({
  getDefaultProps: function(){
    return {
      onClick: function(){}
    };
  },
  handleClick: function(event){
    this.props.onClick(this.props);
  },
  render: function(){
    return (
      <li>
        <span>{this.props.text}</span>
        <span onClick={this.handleClick}>&times;</span>
      </li>
    );
  }
});

module.exports = TodoItem;
