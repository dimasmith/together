/**
 * Control previews for all users
 */
var PreviewProtocol = require('../common/previewProtocol');

const photos = [
  {url: 'http://lorempixel.com/800/600/abstract', date: new Date()},
  {url: 'http://lorempixel.com/800/600/animals', date: new Date()},
  {url: 'http://lorempixel.com/800/600/business', date: new Date()},
  {url: 'http://lorempixel.com/800/600/cats', date: new Date()},
  {url: 'http://lorempixel.com/800/600/city', date: new Date()},
  {url: 'http://lorempixel.com/800/600/food', date: new Date()},
  {url: 'http://lorempixel.com/800/600/nightlife', date: new Date()},
  {url: 'http://lorempixel.com/800/600/fashion', date: new Date()},
  {url: 'http://lorempixel.com/800/600/people', date: new Date()},
  {url: 'http://lorempixel.com/800/600/nature', date: new Date()},
  {url: 'http://lorempixel.com/800/600/sports', date: new Date()},
  {url: 'http://lorempixel.com/800/600/technics', date: new Date()},
  {url: 'http://lorempixel.com/800/600/transport', date: new Date()},
];

var navigation = {
  index: 0,
  count: photos.length,
  updatedAt: new Date(),
};

var preview = {
  photos: photos,
  navigation: navigation,
};

var PreviewController = function(socket) {
  this.socket = socket;
  socket.on(PreviewProtocol.REQUEST_PREVIEW, this.sendPreview.bind(this));
  socket.on(PreviewProtocol.CHANGE_PHOTO, this.onChangePhoto.bind(this));
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
  preview.navigation.index = JSON.parse(data).currentPhoto;
  this.socket.broadcast.emit(
    PreviewProtocol.CHANGE_PHOTO,
    JSON.stringify({currentPhoto: preview.navigation.index})
  );
};

function handlePreviews(io) {
  io.on('connection', PreviewController.start);
}

module.exports = handlePreviews;
