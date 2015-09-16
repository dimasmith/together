/**
 * Application server. Entry point for all app.
 * @type {module.exports}
 */
import express from 'express';
import {Server} from 'http';
import startSyncServer from './syncServer';
import PreviewLoaderFactory from './PreviewLoaderFactory';
import * as gallery from './gallery.js';
import IO from 'socket.io';
import logger from './util/logger.js';

const app = express();
const server = new Server(app);
const io = new IO(server);

function start(config) {
  app.use(express.static('dist'));
  app.use('/assets', express.static('assets'));

  // serve yet another static directory for photos
  if (config.photosDir) {
    app.use('/photos', express.static(config.photosDir));
  }

  const galleryLoader = PreviewLoaderFactory.create(
    config.previewLoader.type,
    config.previewLoader.config
  );

  gallery.setPhotos(galleryLoader.loadPhotos());

  startSyncServer(io, gallery);

  logger.info('Starting server on', config.host, config.port);
  server.listen(config.port, () => logger.info('Server started on', config.host, config.port));
}

export default start;
