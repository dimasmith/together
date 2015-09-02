/**
 * Application server. Entry point for all app.
 * @type {module.exports}
 */
var express = require('express');
var app = express();

var config = {
  host: process.env.SERVER_HOST || 'localhost',
  port: process.env.SERVER_PORT || 8000,
  development: process.env.NODE_ENV !== 'production',
  devPort: process.env.DEV_SERVER_PORT || 9000,
};

app.use(express.static('dist'));

console.info('Starting server on', config.host, config.port);
app.listen(config.port, function() {
  console.info('Server started on', config.host, config.port);
});

// Development mode
// Start webpack dev server as proxy for main server
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var compilerConfiguration = require('./webpack.config');

var compiler = webpack(compilerConfiguration);
var devServer = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/dist',
  filename: 'bundle.js',
  inline: true,
  proxy: {
    '*': 'http://' + config.host + ':' + config.port,
  },
});

if (config.development) {
  devServer.listen(config.devPort, config.host, function() {
    console.info('Dev server started in proxy mode on', config.devPort);
  });
}
