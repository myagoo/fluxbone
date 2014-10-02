/** @jsx React.DOM */

var React = require('react');
var TodoList = require('./components/TodoList.js');



document.addEventListener('DOMContentLoaded', function() {
  React.renderComponent(<TodoList/>, document.body);
});
