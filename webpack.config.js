// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel'
      },
      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};