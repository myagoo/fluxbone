/** @jsx React.DOM */

var React = require('react/addons');
var NavItem = require('react-bootstrap').NavItem;
var LinkMixin = require('./LinkMixin.js');
var NavItemLink = React.createClass({
    mixins: [LinkMixin],
    render: function(){
        return this.transferPropsTo(<NavItem className={this.getClassName()} href={this.getHref()} onClick={this.handleClick}>{this.props.children}</NavItem>);
    }
});

module.exports = NavItemLink;
