var path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'main.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: [
        /\.js$/,
        /\.jsx$/
      ],
      loader: 'jsx-loader?harmony&insertPragma=React.DOM'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'bower_components', 'src']
  }
};