var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var config = require('./config');

const webSocketAddress = (config.development)
  ? '"http://' + config.host + ':' + config.port + '"'
  : 'window.location.href';

// workaround to build backend
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// frontend configuration
module.exports = {
  entry: {
    client: './client/app',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  devtool: 'eval',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: [
          __dirname + '/client',
          __dirname + '/common',
        ],
        loader: 'jscs-loader',
      },
    ],
    loaders: [
      {test: /\.jade$/, loader: 'jade-loader'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {
        test: /\.js$/,
        include: [
          __dirname + '/client',
          __dirname + '/common',
        ],
        loader: 'babel-loader?optional=runtime',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBSOCKET_ADDRESS: webSocketAddress,
    }),
    new HtmlWebpackPlugin({
      title: 'Together',
      template: 'client/index.html',
      inject: 'body',
    }),
  ],
};
