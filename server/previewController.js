/**
 * Control previews for all users
 */
var _ = require('lodash');

import * as Preview from '../common/preview';
import {CHANGE_PHOTO, INITIALIZE_PREVIEW, REQUEST_PREVIEW, SHOW_THUMBNAILS}  from '../common/previewProtocol';

var gallery = Preview.createPreview();

class Session {

  constructor(socket) {
    this.socket = socket;
    socket.on(REQUEST_PREVIEW, () => this.sendPreview());
    socket.on(CHANGE_PHOTO, (data) => this.onChangePhoto(data));
    socket.on(SHOW_THUMBNAILS, () => this.onShowThumbnails());
  }

  sendPreview() {
    this.socket.emit(
      INITIALIZE_PREVIEW,
      JSON.stringify(gallery));
  }

  onChangePhoto(data) {
    var response = JSON.parse(data);
    gallery = Preview.setCurrentPhotoIndex(gallery, response.index);
    this.socket.broadcast.emit(
      CHANGE_PHOTO,
      JSON.stringify({index: gallery.navigation.index})
    );
  }

  onShowThumbnails() {
    gallery = Preview.setViewMode(gallery, Preview.THUMBNAILS_MODE);
    this.socket.broadcast.emit(
      SHOW_THUMBNAILS
    );
  }

  static start(socket) {
    return new Session(socket);
  }
}

export default function(io, previewLoader) {
  gallery = Preview.setPhotos(gallery, previewLoader.loadPhotos());

  io.on('connection', Session.start);
}
