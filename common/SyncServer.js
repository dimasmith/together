/**
 * Gallery synchronization server
 */
import {SHOW_PHOTO, INITIALIZE_GALLERY, REQUEST_GALLERY, SHOW_THUMBNAILS}  from './synchronizationProtocol.js';

class SyncServer {

  constructor(transport) {
    if (!transport) {
      throw new Error('transport required');
    }

    this.transport = transport;
  }

  /**
   * Notifies all clients about particular photo was opened
   * @param {Object} navigation object with index property
   */
  sendShowPhoto(navigation) {
    this.transport.broadcast(
      SHOW_PHOTO,
      {index: navigation.index}
    );
  }

  /**
   * Notifies all clients about opening of thumbnails view
   */
  sendShowThumbnails() {
    this.transport.broadcast(
      SHOW_THUMBNAILS
    );
  }

  /**
   * Sent complete representation of gallery to connected client.
   * @param state
   */
  sendGallery(state) {
    this.transport.send(INITIALIZE_GALLERY, state);
  }

  /**
   * Called when one of clients shows photo
   * @param callback
   */
  onShowPhoto(callback) {
    this.transport.on(SHOW_PHOTO, (data) => callback(data));
  }

  /**
   * Called when one of clients opens thumbnails view
   * @param callback
   */
  onShowThumbnails(callback) {
    this.transport.on(SHOW_THUMBNAILS, () => callback());
  }

  /**
   * Called when new client requests full gallery data.
   * @param callback
   */
  onRequestGallery(callback) {
    this.transport.on(REQUEST_GALLERY, () => callback());
  }
}

export default SyncServer;
