import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './config.js';

const webSocketAddress = (config.development)
  ? '"http://' + config.host + ':' + config.port + '"'
  : 'window.location.href';

const sourceDirs = [
  __dirname + '/client',
  __dirname + '/common',
];

export default {
  entry: {
    client: './client/app',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  module: {
    preLoaders: [
      {test: /\.js$/, include: sourceDirs, loader: 'jscs-loader'},
    ],
    loaders: [
      {test: /\.jade$/, loader: 'jade-loader'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.js$/, include: sourceDirs, loader: 'babel-loader?optional=runtime'},
      {test: /\.(gif|png|jpe?g|svg)$/, loaders: [
        'url?limit=10240&name=[path][name].[ext]?[hash]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],},
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
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
