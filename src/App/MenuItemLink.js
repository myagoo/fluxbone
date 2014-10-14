/** @jsx React.DOM */

var React = require('react/addons');
var MenuItem = require('react-bootstrap').MenuItem;
var LinkMixin = require('./LinkMixin.js');
var MenuItemLink = React.createClass({
    mixins: [LinkMixin],
    render: function(){
        return this.transferPropsTo(<MenuItem className={this.getClassName()} href={this.getHref()} onClick={this.handleClick}>{this.props.children}</MenuItem>);
    }
});

module.exports = MenuItemLink;
