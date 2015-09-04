/**
 * Control previews for all users
 */
var _ = require('lodash');

var Preview = require('../common/preview');
var PreviewProtocol = require('../common/previewProtocol');

var preview = Preview.createPreview();

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
  var response = JSON.parse(data);
  preview = Preview.setCurrentPhotoIndex(preview, response.index);
  this.socket.broadcast.emit(
    PreviewProtocol.CHANGE_PHOTO,
    JSON.stringify({index: preview.navigation.index})
  );
};

PreviewController.prototype.onShowThumbnails = function() {
  preview = Preview.setViewMode(preview, Preview.THUMBNAILS_MODE);
  this.socket.broadcast.emit(
    PreviewProtocol.SHOW_THUMBNAILS
  );
};

function handlePreviews(io, previewLoader) {
  preview = Preview.setPhotos(preview, previewLoader.loadPhotos());

  io.on('connection', PreviewController.start);
}

module.exports = handlePreviews;
