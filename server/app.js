/**
 * Application server. Entry point for all app.
 * @type {module.exports}
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var startSyncServer = require('./syncServer');
var PreviewLoaderFactory = require('./PreviewLoaderFactory');
import * as gallery from './gallery.js';

function start(config) {

  app.use(express.static('dist'));
  app.use('/assets', express.static('assets'));

  // serve yet another static directory for photos
  if (config.photosDir) {
    app.use('/photos', express.static(config.photosDir));
  }

  var galleryLoader = PreviewLoaderFactory.create(
    config.previewLoader.type,
    config.previewLoader.config
  );

  gallery.setPhotos(galleryLoader.loadPhotos());

  startSyncServer(io, gallery);

  console.info('Starting server on', config.host, config.port);
  server.listen(config.port, function() {
    console.info('Server started on', config.host, config.port);
  });
}

export default start;
