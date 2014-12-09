var React = require('react/addons');
var {
  Navigation, State
} = require('react-router');

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}



var LinkMixin = {
  contextTypes: {
    makePath: Navigation.contextTypes.makePath,
    makeHref: Navigation.contextTypes.makeHref,
    transitionTo: Navigation.contextTypes.transitionTo,
    replaceWith: Navigation.contextTypes.replaceWith,
    goBack: Navigation.contextTypes.goBack,

    getCurrentPath: State.contextTypes.getCurrentPath,
    getCurrentRoutes: State.contextTypes.getCurrentRoutes,
    getCurrentParams: State.contextTypes.getCurrentParams,
    getCurrentQuery: State.contextTypes.getCurrentQuery,
    isActive: State.contextTypes.isActive
  },

  makePath: Navigation.makePath,
  makeHref: Navigation.makeHref,
  transitionTo: Navigation.transitionTo,
  replaceWith: Navigation.replaceWith,
  goBack: Navigation.goBack,

  getPath: State.getRoutes,
  getRoutes: State.getRoutes,
  getParams: State.getParams,
  getQuery: State.getQuery,
  isActive: State.isActive,

  propTypes: {
    activeClassName: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    query: React.PropTypes.object,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      activeClassName: 'active'
    };
  },

  handleClick: function(event) {
    var allowTransition = true;
    var clickResult;

    if (this.props.onClick) {
      clickResult = this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (clickResult === false || event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      this.transitionTo(this.props.to, this.getParams(), this.getQuery());
    }
  },

  /**
   * Returns the value of the "href" attribute to use on the DOM element.
   */
  getHref: function() {
    return this.makeHref(this.props.to, this.getParams(), this.getQuery());
  },

  /**
   * Returns the value of the "class" attribute to use on the DOM element, which contains
   * the value of the activeClassName property when this <Link> is active.
   */
  getClassName: function() {
    var classNames = {};

    if (this.props.className) {
      classNames[this.props.className] = true;
    }

    if (this.isActive(this.props.to, this.getParams(), this.getQuery())) {
      classNames[this.props.activeClassName] = true;
    }

    return React.addons.classSet(classNames);
  }
};

module.exports = LinkMixin;
