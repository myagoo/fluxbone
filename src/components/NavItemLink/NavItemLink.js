/** @jsx React.DOM */

var React = require('react/addons');
var NavItem = require('react-bootstrap').NavItem;
var LinkMixin = require('mixins/LinkMixin.js');

var NavItemLink = React.createClass({
    mixins: [LinkMixin],
    render: function(){
        return <NavItem {...this.props} className={this.getClassName()} href={this.getHref()} onClick={this.handleClick}>{this.props.children}</NavItem>
    }
});

module.exports = NavItemLink;
