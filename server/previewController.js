/**
 * Control previews for all users
 */
var _ = require('lodash');

var PreviewProtocol = require('../common/previewProtocol');

const THUMBNAILS_MODE = 'THUMBNAILS';

var navigation = {
  index: 0,
  count: 0,
  updatedAt: new Date(),
};

var preview = {
  photos: [],
  navigation: navigation,
};

function setPhotos(preview, photos) {
  return _.extend({}, preview, {
    photos: photos,
    navigation: {
      index: 0,
      count: photos.length,
      updatedAt: new Date(),
    },
  });
}

function setCurrentPhotoIndex(preview, index) {
  return _.extend({}, preview, {
    navigation: {
      index: index,
    },
  });
}

function setViewMode(preview, viewMode) {
  return _.extend({}, preview, {
    navigation: {
      viewMode: viewMode,
    },
  });
}

var PreviewController = function(socket) {
  this.socket = socket;
  socket.on(PreviewProtocol.REQUEST_PREVIEW, this.sendPreview.bind(this));
  socket.on(PreviewProtocol.CHANGE_PHOTO, this.onChangePhoto.bind(this));
  socket.on(PreviewProtocol.SHOW_THUMBNAILS, this.onShowThumbnails.bind(this));
};

PreviewController.start = function(socket) {
  return new PreviewController(socket);
};

PreviewController.prototype.sendPreview = function() {
  this.socket.emit(
    PreviewProtocol.INITIALIZE_PREVIEW,
    JSON.stringify(preview));
};

PreviewController.prototype.onChangePhoto = function(data) {
  preview = setCurrentPhotoIndex(preview, JSON.parse(data).currentPhoto);
  this.socket.broadcast.emit(
    PreviewProtocol.CHANGE_PHOTO,
    JSON.stringify({currentPhoto: preview.navigation.index})
  );
};

PreviewController.prototype.onShowThumbnails = function(data) {
  preview = setViewMode(preview, THUMBNAILS_MODE);
  this.socket.broadcast.emit(
    PreviewProtocol.SHOW_THUMBNAILS
  );
};

function handlePreviews(io, previewLoader) {
  preview = setPhotos(preview, previewLoader.loadPhotos());

  io.on('connection', PreviewController.start);
}

module.exports = handlePreviews;
