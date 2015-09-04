var webpack = require('webpack');
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
    loaders: [
      {test: /\.jade$/, loader: 'jade-loader'},
      {test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader?optional=runtime'},
      {test: /\.scss$/, loader: 'style!css!sass'},
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBSOCKET_ADDRESS: webSocketAddress,
    }),
  ],
};
