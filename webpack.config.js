var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: [/\.js$/,/\.jsx$/], loader: 'jsx-loader?harmony&insertPragma=React.DOM' },
      { test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
