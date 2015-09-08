/**
 * Application server. Entry point for all app.
 * @type {module.exports}
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var handlePreviews = require('./previewController');
var PreviewLoaderFactory = require('./PreviewLoaderFactory');

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
}

export default start;
