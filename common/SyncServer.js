/**
 * Client communication session.
 */
import {CHANGE_PHOTO, INITIALIZE_PREVIEW, REQUEST_PREVIEW, SHOW_THUMBNAILS}  from './previewProtocol.js';

class SyncSession {

  constructor(transport) {
    this.transport = transport;
  }

  onChangePhoto(callback) {
    this.transport.on(CHANGE_PHOTO, (data) => callback(data));
  }

  onShowThumbnails(callback) {
    this.transport.on(SHOW_THUMBNAILS, () => callback());
  }

  onRequestGallery(callback) {
    this.transport.on(REQUEST_PREVIEW, () => callback());
  }

  sendGallery(state) {
    this.transport.send(INITIALIZE_PREVIEW, state);
  }

  sendOpenPhoto(state) {
    this.transport.broadcast(
      CHANGE_PHOTO,
      {index: state.navigation.index}
    );
  }

  sendOpenThumbnails() {
    this.transport.broadcast(
      SHOW_THUMBNAILS
    );
  }
}

export default SyncSession;
