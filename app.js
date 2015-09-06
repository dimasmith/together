/**
 * Application server. Entry point for all app.
 * @type {module.exports}
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var handlePreviews = require('./server/previewController');
var PreviewLoaderFactory = require('./server/PreviewLoaderFactory');

function start(config) {

  app.use(express.static('dist'));
  app.use('/assets', express.static('assets'));

  // serve yet another static directory for photos
  if (config.photosDir) {
    app.use('/photos', express.static(config.photosDir));
  }

  var previewLoader = PreviewLoaderFactory.create(
    config.previewLoader.type,
    config.previewLoader.config
  );

  handlePreviews(io, previewLoader);

  console.info('Starting server on', config.host, config.port);
  server.listen(config.port, function() {
    console.info('Server started on', config.host, config.port);
  });

  if (config.development) {
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

    devServer.listen(config.proxyPort, config.host, function() {
      console.info('Dev server started in proxy mode on', config.proxyPort);
    });
  }

}

module.exports = start;
