/**
 * Control previews for all users
 */
var _ = require('lodash');

import * as Preview from '../common/preview';
import {CHANGE_PHOTO, INITIALIZE_PREVIEW, REQUEST_PREVIEW, SHOW_THUMBNAILS}  from '../common/previewProtocol';
import SocketTransport from '../common/SocketTransport.js';

var gallery = Preview.createPreview();

class Session {

  constructor(transport) {
    this.transport = transport;
    transport.on(REQUEST_PREVIEW, () => this.sendPreview());
    transport.on(CHANGE_PHOTO, (data) => this.onChangePhoto(data));
    transport.on(SHOW_THUMBNAILS, () => this.onShowThumbnails());
  }

  sendPreview() {
    this.transport.send(
      INITIALIZE_PREVIEW,
      JSON.stringify(gallery));
  }

  onChangePhoto(data) {
    var response = JSON.parse(data);
    gallery = Preview.setCurrentPhotoIndex(gallery, response.index);
    this.transport.broadcast(
      CHANGE_PHOTO,
      JSON.stringify({index: gallery.navigation.index})
    );
  }

  onShowThumbnails() {
    gallery = Preview.setViewMode(gallery, Preview.THUMBNAILS_MODE);
    this.transport.broadcast(
      SHOW_THUMBNAILS
    );
  }

  static start(transport) {
    return new Session(transport);
  }
}

export default function(io, previewLoader) {
  gallery = Preview.setPhotos(gallery, previewLoader.loadPhotos());

  io.on('connection', (socket) => {
    let transport = new SocketTransport(socket);
    Session.start(transport);
  });
}
