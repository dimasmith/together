var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config');

const webSocketAddress = (config.development)
  ? '"http://' + config.host + ':' + config.port + '"'
  : 'window.location.href';

module.exports = {
  context: __dirname + '/client',
  entry: './app',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
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
