function slice(arrayLike, offset) {
  return Array.prototype.slice.call(arrayLike, offset)
}

function debounce(func, delay) {
  var timer = null;
  return function() {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(this, args);
    }.bind(this), delay);
  };
}

function curry(func) {
  var args = slice(arguments, 1);
  return function() {
    return func.apply(this, args.concat(slice(arguments)));
  };
}

function cascade(funcs) {
  var args = slice(arguments, 1);
  return Promise.resolve(funcs.length ? funcs.shift().apply(this, args) : args[0]).then(function() {
    var newArgs = slice(arguments);
    return funcs.length ? this.cascade.apply(this, [funcs].concat(newArgs || args)) : newArgs[0] || args[0];
  }.bind(this));
}

module.exports = {
  slice: slice,
  curry: curry,
  debounce: debounce,
  cascade: cascade
};