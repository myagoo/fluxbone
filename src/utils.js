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

function cascade(funcs) {
  var args = slice(arguments, 1);
  return Promise.resolve(funcs.length ? funcs.shift().apply(this, args) : args[0]).then(function() {
    var newArgs = slice(arguments);
    return funcs.length ? this.cascade.apply(this, [funcs].concat(newArgs || args)) : newArgs[0] || args[0];
  }.bind(this));
}


function randomInteger(max, min){
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(mix){
    var red = randomInteger(255);
    var green = randomInteger(255);
    var blue = randomInteger(255);

    if(mix){
        mix.red && (red = (red + mix.red) / 2);
        mix.green && (green = (green + mix.green) / 2);
        mix.blue && (blue = (blue + mix.blue) / 2);
    }

    return rgbToHex(red, green, blue);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

module.exports = {
  slice: slice,
  debounce: debounce,
  cascade: cascade,
  extend: require('react/lib/Object.assign'),
  randomInteger: randomInteger,
  randomColor: randomColor,
  rgbToHex: rgbToHex
};
