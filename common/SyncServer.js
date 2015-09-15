/**
 * Client communication session.
 */
import {SHOW_PHOTO, INITIALIZE_GALLERY, REQUEST_GALLERY, SHOW_THUMBNAILS}  from './synchronizationProtocol.js';

class SyncServer {

  constructor(transport) {
    this.transport = transport;
  }

  onShowPhoto(callback) {
    this.transport.on(SHOW_PHOTO, (data) => callback(data));
  }

  onShowThumbnails(callback) {
    this.transport.on(SHOW_THUMBNAILS, () => callback());
  }

  onRequestGallery(callback) {
    this.transport.on(REQUEST_GALLERY, () => callback());
  }

  sendGallery(state) {
    this.transport.send(INITIALIZE_GALLERY, state);
  }

  sendShowPhoto(navigation) {
    this.transport.broadcast(
      SHOW_PHOTO,
      {index: navigation.index}
    );
  }

  sendShowThumbnails() {
    this.transport.broadcast(
      SHOW_THUMBNAILS
    );
  }
}

export default SyncServer;
