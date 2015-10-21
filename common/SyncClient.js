import {REQUEST_GALLERY, SHOW_THUMBNAILS, SHOW_PHOTO, ADD_PHOTOS, INITIALIZE_GALLERY} from './synchronizationProtocol.js';

/**
 * Gallery synchronization client
 */
class SyncClient {

  constructor(transport) {
    if (!transport) {
      throw new Error('transport required');
    }

    this.transport = transport;
  }

  /**
   * Notifies server that photo were open
   * @param {Object} navigation with index property containing photo index
   */
  sendShowPhoto(navigation) {
    this.transport.send(
      SHOW_PHOTO,
      {index: navigation.index}
    );
  }

  /**
   * Notifies server about opening of thumbnails view
   */
  sendShowThumbnails() {
    this.transport.send(SHOW_THUMBNAILS);
  }

  sendAddPhotos(photos) {
    this.transport.send(ADD_PHOTOS, photos);
  }

  /**
   * Load gallery from server.
   * Loading is asynchronous so promise is returned.
   * It will be resolved with raw gallery data upon
   * loading
   * @returns {Promise}
   */
  loadGallery() {
    this.transport.send(REQUEST_GALLERY);
    return new Promise((resolve) => {
      this.transport.on(
        INITIALIZE_GALLERY,
          data => resolve(data)
      );
    });
  }

  /**
   * Calls supplied callback when photo changed on server.
   * Passes navigation data as parameter
   * @param callback
   */
  onShowPhoto(callback) {
    this.transport.on(SHOW_PHOTO, (data) => callback(data));
  }

  /**
   * Calls supplied callback when server switches to thumbnails view.
   * @param callback
   */
  onShowThumbnails(callback) {
    this.transport.on(SHOW_THUMBNAILS, () => callback());
  }

  onAddPhotos(callback) {
    this.transport.on(ADD_PHOTOS, photos => callback(photos));
  }
}

export default SyncClient;
